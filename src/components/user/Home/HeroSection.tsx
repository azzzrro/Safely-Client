import ThemeButton from "../../assets/ThemeButton";

const HeroSection = () => {
    return (
        <>
            <div className="">
                <div style={{ height: "65vh" }}>
                    <div
                        className="hero h-full"
                        style={{
                            backgroundImage: "url(https://d2y3cuhvusjnoc.cloudfront.net/hero_section_girl_image.jpg)",
                        }}
                    >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content md:w-full md:justify-start md:pl-3 text-center md:text-left text-white">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Your Safe Journey Begins Here</h1>
                                <p className="mb-5 font-light">
                                    Safe, Reliable, and Exclusive Cab Service for Women, by Women. Where Safety Meets
                                    Convenience. Book Your Cab Now!
                                </p>
                                {/* <button className="btn bg-blue-800 text-golden">Get Started</button> */}
                                <ThemeButton text="get assistance" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
