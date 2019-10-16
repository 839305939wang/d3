const path = require("path");
const utils = require("./utils");
const apiMocker = require("mocker-api");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MarkdownItContainer = require("markdown-it-container");
const striptags = require("./strip-tags");
let HyperDown = require("hyperdown");
let parser = new HyperDown();
const vueMarkdown = {
  raw: true,
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(
      MarkdownIt.renderer.rules.fence
    );
    const code_inline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function(...args) {
      args[0][args[1]].attrJoin("class", "code_inline");
      return code_inline(...args);
    };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      "demo",
      {
        validate: params => { 
          return params.trim().match(/^demo\s*(.*)$/)
        },
        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
          if (tokens[idx].nesting === 1) {
            var desc = tokens[idx + 2].content;
            const html = utils.convertHtml(
              striptags(tokens[idx + 1].content, "script")
            );
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = [];

            return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
          }
          return "</div></demo-block>\n";
        }
      }
    ]
  ]
};

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  filenameHashing: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  configureWebpack: {
    resolve:{
       alias:{
        '@ant-design/icons/lib/dist': path.resolve(__dirname, '../packages/icons'),
       }
    },
    module: {},
    plugins: [
      new CopyWebpackPlugin([

      ])
    ],
  },
  devServer: {
    before(app) {
      apiMocker(app, path.resolve("./mockData"), {
        proxy: {
          "/credit/(.*)": "https://staging.zcygov.cn"
        },
        changeHost: true
      });
      apiMocker(app, path.resolve("./mockData"), {
        proxy: {
          "/api/(.*)": "https://jyzb-staging.zcygov.cn/"
        },
        changeHost: true
      })
    }
  },
  chainWebpack: config => {
    config.entry.app = ["babel-polyfill", path.resolve(__dirname, "../packages/index.js")],
    config.resolve.alias.set("@", path.resolve(__dirname, "../packages"));
    config.module
      .rule("eslint")
      .exclude.add(path.resolve(__dirname, "../lib"))
      .end();
    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, "../packages"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options(vueMarkdown);
  }
};
