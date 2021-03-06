import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res, blockRes) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
    blockRes,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

// const checkNodeBlocksStart = (node) => {
//   return {
//     type: types.CHECK_NODE_BLOCKS_START,
//     node,
//   };
// };

// const checkNodeBlocksSuccess = (node, res) => {
//   return {
//     type: types.CHECK_NODE_BLOCKS_SUCCESS,
//     node,
//     res,
//   };
// };
// const checkNodeBlocksFailure = (node) => {
//   return {
//     type: types.CHECK_NODE_BLOCKS_FAILURE,
//     node,
//   };
// };

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);
      const resp = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400 || resp.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();
      const jsoBlocks = await resp.json();
      dispatch(checkNodeStatusSuccess(node, json, jsoBlocks));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

// export function checkNodeBlock(node) {
//   return async (dispatch) => {
//     try {
//       dispatch(checkNodeBlocksStart(node));
//       const res = await fetch(`${node.url}/api/v1/blocks`);
//       if (res.status >= 400) {
//         dispatch(checkNodeBlocksFailure(node));
//       }

//       const json = await res.json();
//       console.log("blocks json", json);
//       dispatch(checkNodeBlocksSuccess(node, json));
//     } catch (err) {
//       dispatch(checkNodeBlocksFailure(node));
//     }
//   };
// }

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}

// export function checkNodeBlockes(list) {
//   return (dispatch) => {
//     list.forEach((node) => {
//       dispatch(checkNodeBlock(node));
//     });
//   };
// }
