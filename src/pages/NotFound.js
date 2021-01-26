import React from 'react';
import GoHomeButton from "../components/GoHomeButton";


const NotFound = () => (
         <div className="middle-box text-center animated fadeInDown ">
              <h1 style={{
                  color: "#bcbcbcbc"
              }}>404</h1>
                 <h3 className="font-bold" style={{
                     color: "#999999"
                 }}>Page Not Found</h3>
                  <div className="error-desc" style={{
                      color: "#ababab"
                  }}>
                     Sorry, but the page you are looking for has not been found. Try checking the URL for error, then hit the
                     refresh button on your browser or try found something else in our app.<br/>
                     <GoHomeButton/>
                  </div>
         </div>
)

export default NotFound