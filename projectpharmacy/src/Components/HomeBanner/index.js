import React from "react";
import Slider from "react-slick";
import ContactButtons from "../ContactButtons/ContactButtons";

const HomeBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  return (
    <div
      className="homeBannerSection"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url(https://www.shutterstock.com/image-photo/diverse-young-group-engineers-working-260nw-2316798077.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          zIndex: -1,
          filter: "brightness(40%)",
        }}
      ></div>

      {/* Slider Section */}
      <Slider {...settings}>
        <div className="item">
          <img
            src="https://media.istockphoto.com/id/1156456850/photo/close-up-of-test-tubes-being-used-in-chemical-lab.jpg?s=612x612&w=0&k=20&c=UWhuWx2u4kTAty3aH1vHXGskNxFadJcbn72hxEXlhfU="
            alt="Test Tubes"
          />
        </div>
        <div className="item">
          <img
            src="https://images.jdmagicbox.com/quickquotes/images_main/medical-laboratory-equipment-2216463628-21zzqv27.jpg"
            alt="Lab Equipment"
          />
        </div>
        <div className="item">
          <img
            src="https://thumbs.dreamstime.com/b/medical-background-medical-tools-stethoscope-86031880.jpg"
            alt="Medical Tools"
          />
        </div>
        <div className="item">
          <img
            src="https://dg1xqmhtoint1.cloudfront.net/img/ihs/blog/MLT-2.webp?mtime=20230220102524&focal=none"
            alt="Lab Team"
          />
        </div>
      </Slider>
      <ContactButtons />
     
      
    </div>
  );
};

export default HomeBanner;
