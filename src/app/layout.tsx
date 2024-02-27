'use client';
import "./globals.css";
import Header from "@/Components/Header/Header";
import UserContext from "@/Contexts/UserContext";
import Navbar from "@/Components/Navbar/Navbar";
import { AuthContext } from "@/Contexts/UserContext";
import { useContext } from "react";
import Toastify from 'toastify-js';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  const { isAuthenticated } = useContext(AuthContext);
  if(isAuthenticated){
    return (
      <html lang="pt-BR">
        <body>
          <UserContext>
            <>                     
              <div className="h-screen flex flex-col">  
                <Header />
                <div className="layoutContainer">
                  <Navbar />   
                  {children}
                </div>
              </div>
            </>
          </UserContext>
        </body>
      </html>
    );
  }else{
      return (
    <html lang="pt-BR">
      <body>
        <UserContext>
          <>                     
            <div className="h-screen flex flex-col">  
              <Header />
              <div className="h-screen flex">  
                {children}
              </div>
            </div>
          </>
        </UserContext>
      </body>
    </html>
  );
  }

}
