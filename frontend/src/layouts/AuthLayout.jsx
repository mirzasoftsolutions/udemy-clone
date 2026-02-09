export default function AuthLayout({ title, children }) {
return (
    <div className="flex items-center justify-center ">
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">{title}</h1>
            {children}
        </div>
    </div>
);

}


// import { Outlet } from "react-router-dom"

// export default function AuthLayout() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <Outlet />
//     </div>
//   )
// }
