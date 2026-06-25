import { createContext,useState } from "react";

export const AuthContext = createContext(null);

export  default function AuthContextProvider({children}) {

// const [user,setUser] = useState(localStorage.getItem("currentUserEmail") || null);

const [user,setUser] = useState(localStorage.getItem("currentUserEmail") ? {email:localStorage.getItem("currentUserEmail")} : null);



//   function signup(email, password) {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");

//     if (users.find((u) => u.email === email)) {
//       return { success: false, error: "Email already exists" };
//     }
//     const newUser = { email, password };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.setItem("currentUserEmail", email);

//     setUser({ email });

//     return { success: true };
//   }




function signup(email,password){
const users = JSON.parse(localStorage.getItem("users") || "[]");

if(users.find((user) => user.email === email)){
    return {success:false, error:"Email already exists"};
}

// const users = [];
const newUser = {email,password};
 users.push(newUser);
 localStorage.setItem("users",JSON.stringify(users));
 localStorage.setItem("currentUserEmail",
    // JSON.stringify(newUser)
    email
);

 setUser({email});

 return {success:true}
    // message:"USer registered successfully."}
}

function login(email,password){
const users = JSON.parse(localStorage.getItem("users") || "[]");

const user = users.find((u)=> u.email === email && u.password === password);


if(!user){
    return{success:false, error:"Invalid email or password."};
}
 
localStorage.setItem("curentUserEmail",email);
return {success:true, message:"User Loged in successfully."}
console.log({success:true, message:"User Loged in successfully."});
 setUser({ email });

return { success: true };

}

function logout(){
localStorage.removeItem("currentUserEmail");
setUser(null);
}

return (<AuthContext.Provider value={{signup,user,login,logout}}>{children}</AuthContext.Provider>);
}