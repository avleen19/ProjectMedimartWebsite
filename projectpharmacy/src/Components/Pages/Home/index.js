import React from 'react';
import HomeBanner  from "../../HomeBanner";
import AboutUs from "../../Aboutus";
import Products from "../../Products"
const Home =()=>{
    return(
      <>
     <HomeBanner></HomeBanner>
     <Products></Products>
     <ContactUs></ContactUs>
     <AboutUs></AboutUs>
        
      </>
    )
  }
  
  export default Home;
