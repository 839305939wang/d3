/**
 * mock方式可以参考
 * https://github.com/jaywcjlove/mocker-api
 */
module.exports = {
  "POST /credit/template/data/view/no": {
    success: true,
    result: [
      {
        id: "100012234",
        app: "æ­å·žä½“è‚²é¦†",
        bizId: "1460750000000034696",
        subBizId: "1460750000000034696",
        evaluateId: 100019460,
        evaluater: "å›å›æµ‹è¯•é‡‡è´­å•ä½å®¡æ ¸äºº",
        evaluateOrgId: 100014361,
        evaluateOrgName: "å›å›çš„æµ‹è¯•é‡‡è´­å•ä½",
        evaluatedId: 100018750,
        evaluateder: "å‡Œä¸€æ¶µ",
        evaluatedOrgId: 100013910,
        evaluatedOrgName: "æ±Ÿè‹çœå—äº¬å¸‚çŽ„æ­¦åŒºé›¶äºŒæœ‰é™å…¬å¸",
        content: "xdsvcbwvcwebhcertyhjuiklokijuhygtfrgthygtfr",
        ruleType: 20,
        score: 85,
        ruleId: 131,
        modifyDay: 15,
        evaDay: 15,
        nodeDtos: [
          {
            evaTargetId: 172,
            evaTargetName: "供货",
            id: 172,
            name: "供货",
            score: 80,
            weight: 100,
            remark: "供货",
            index: null
          },
          {
            evaTargetId: 171,
            evaTargetName: "供货",
            id: 171,
            name: "供货",
            score: 80,
            weight: 100,
            remark: "供货",
            index: null
          },
          {
            evaTargetId: 170,
            evaTargetName: "服务",
            id: 170,
            name: "服务",
            score: 100,
            weight: 100,
            remark: "服务",
            index: null
          },
          {
            evaTargetId: 169,
            evaTargetName: "质量",
            id: 169,
            name: "质量",
            score: 80,
            weight: 100,
            remark: "质量",
            index: null
          }
        ],
        attachDtos: [
          {
            fileId:
              "1061CL/339900/100019460/20195/cbf9e3ac-da67-4235-8798-5b2a3c23c78a",
            type: null
          }
        ],
        ruleVersion: 279,
        status: 0,
        totalScore: 400,
        parentId: null,
        createAt: 1557113649000,
        projectName: null,
        projectNo: null,
        deductScore: null,
        messageExt:
          '{"checkFinishTime":"1557109703000","supplierId":"100019460","supplierName":"å‡Œä¸€æ¶µ"}',
        originalStatus: 2,
        businessDimension1: null,
        businessDimension2: null,
        businessDimension3: null
      },
      {
        id: "100012236",
        app: "æ­å·žä½“è‚²é¦†",
        bizId: "1460750000000034696",
        subBizId: "1460750000000034696",
        evaluateId: 100019460,
        evaluater: "å›å›æµ‹è¯•é‡‡è´­å•ä½å®¡æ ¸äºº",
        evaluateOrgId: 100014361,
        evaluateOrgName: "å›å›çš„æµ‹è¯•é‡‡è´­å•ä½",
        evaluatedId: 100018750,
        evaluateder: "å‡Œä¸€æ¶µ",
        evaluatedOrgId: 100013910,
        evaluatedOrgName: "æ±Ÿè‹çœå—äº¬å¸‚çŽ„æ­¦åŒºé›¶äºŒæœ‰é™å…¬å¸",
        content: "è¿½è¯„è¿½è¯„ï¼ï¼ï¼ï¼ï¼ï¼ï¼ï¼ï¼ï¼",
        ruleType: 20,
        score: 85,
        ruleId: 131,
        modifyDay: null,
        evaDay: null,
        nodeDtos: null,
        attachDtos: [
          {
            fileId:
              "1061CL/339900/100019460/20195/cbf9e3ac-da67-4235-8798-5b2a3c23c78a",
            type: null
          }
        ],
        ruleVersion: 279,
        status: 1,
        totalScore: null,
        parentId: "100012234",
        createAt: 1557114348000,
        projectName: null,
        projectNo: null,
        deductScore: null,
        messageExt:
          '{"checkFinishTime":"1557109703000","supplierId":"100019460","supplierName":"å‡Œä¸€æ¶µ"}',
        originalStatus: null,
        businessDimension1: null,
        businessDimension2: null,
        businessDimension3: null
      }
    ],
    error: ""
  },
  "GET /credit/template/rule/list/:id/no": {
    success: true,
    result: {
      moduleDto: {
        evalute: true,
        examine: false,
        remark: true,
        attach: true,
        againEvaluate: true,
        examineDeduct: false
      },
      nodeDtos: [
        {
          id: 172,
          name: "供货",
          remark: "供货",
          defaultScore: 80,
          deductionNodeDtos: null
        },
        {
          id: 171,
          name: "价格",
          remark: "价格",
          defaultScore: 80,
          deductionNodeDtos: null
        },
        {
          id: 170,
          name: "服务",
          remark: "服务",
          defaultScore: 100,
          deductionNodeDtos: null
        },
        {
          id: 169,
          name: "质量",
          remark: "质量",
          defaultScore: 80,
          deductionNodeDtos: null
        }
      ],
      nodeConfigDto: { required: true, check: true, isCanModify: false },
      remarkDto: { required: true, check: true },
      attachDto: { required: false, check: true },
      againEvaluateDto: { required: false, check: true, isCanModify: false }
    },
    error: null
  },
  "POST /credit/template/node/evaluate/feedback/1": {
    success: true,
    result: [
      {
        nodeId: 53,
        nodeName: "供货能力",
        score: 82,
        weight: -0.46,
        nodeNumberDto: {
          count: 5103,
          score: 82,
          starLevel: 4.1,
          nodeNumberAnalyzeDtos: [
            { starLevel: 1, count: 1, weight: 0 },
            { starLevel: 2, count: 0, weight: 0 },
            { starLevel: 3, count: 1, weight: 0 },
            { starLevel: 4, count: 4528, weight: 89 },
            { starLevel: 5, count: 573, weight: 11 }
          ]
        }
      },
      {
        nodeId: 54,
        nodeName: "服务能力",
        score: 82,
        weight: -0.46,
        nodeNumberDto: {
          count: 5103,
          score: 82,
          starLevel: 4.1,
          nodeNumberAnalyzeDtos: [
            { starLevel: 1, count: 0, weight: 0 },
            { starLevel: 2, count: 0, weight: 0 },
            { starLevel: 3, count: 0, weight: 0 },
            { starLevel: 4, count: 4529, weight: 89 },
            { starLevel: 5, count: 574, weight: 11 }
          ]
        }
      },
      {
        nodeId: 55,
        nodeName: "产品质量",
        score: 82,
        weight: -0.45,
        nodeNumberDto: {
          count: 5103,
          score: 82,
          starLevel: 4.1,
          nodeNumberAnalyzeDtos: [
            { starLevel: 1, count: 0, weight: 0 },
            { starLevel: 2, count: 0, weight: 0 },
            { starLevel: 3, count: 0, weight: 0 },
            { starLevel: 4, count: 4532, weight: 89 },
            { starLevel: 5, count: 571, weight: 11 }
          ]
        }
      },
      {
        nodeId: 56,
        nodeName: "产品价格",
        score: 82,
        weight: -0.38,
        nodeNumberDto: {
          count: 5103,
          score: 82,
          starLevel: 4.1,
          nodeNumberAnalyzeDtos: [
            { starLevel: 1, count: 0, weight: 0 },
            { starLevel: 2, count: 0, weight: 0 },
            { starLevel: 3, count: 0, weight: 0 },
            { starLevel: 4, count: 4543, weight: 89 },
            { starLevel: 5, count: 560, weight: 11 }
          ]
        }
      }
    ],
    error: null
  }
};
