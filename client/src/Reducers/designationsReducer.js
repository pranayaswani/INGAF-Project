import { createReducer } from "@reduxjs/toolkit";
//     OLD VERSION
// export  const userReducer = (state=null, action) => {
//     switch (action.type)
//     {
//         case "INGAF Functionary":
//             return action.payload;
//         case "Client":
//             return action.payload;
//         case "Controller":
//             return action.payload;
//         case "Participant":
//             return action.payload;
//         case "NOT_LOGGED":
//             return state;
//         default:
//             return state;
//     }
// }

//     NEW VERSION
export const designationDetails = createReducer(
  {
    designationDetails: {},
  },
  {
    fetchDesignations: (state, action) => {
      state.designationDetails = action.payload;
    },
  }
);

export const trainingCentreDetails = createReducer(
  {
    designationDetails: {},
  },
  {
    fetchDesignations: (state, action) => {
      state.designationDetails = action.payload;
    },
  }
);
