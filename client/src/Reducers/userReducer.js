import { createReducer } from "@reduxjs/toolkit";
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
export const userDetails = createReducer(
    {
        userDetails:{},

    },
    {
        loggedInCase: (state, action)=>{
            state.userDetails = action.payload;
        },
        loggedOutCase: (state, action)=>{
            state.userDetails = action.payload;
        },
    }
)