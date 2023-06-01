export const LandingSection = () => {
    return (
        <section className="bg-[#374151] w-full min-h-screen sm:pt-20 pt-16">
            <div className="w-full h-full sm:flex items-center sm:px-24 sm:py-16 px-2 py-10">
                <div className="bg-[#293241] sm:w-[900px] w-full min-h-[450px] rounded-3xl sm:p-10 p-5">
                    <span className="text-[60px] text-[#e0fbfc]">Introducing PixelScript.</span>
                    <br />
                    <br />

                    <p className="text-[#ffffff] font-light text-[20px] tracking-widest leading-[30px]">
                    
                    Your go-to solution for effortlessly extracting text from images. 
                    Say goodbye to manual typing as our cutting-edge technology empowers you to unlock the 
                    hidden potential of images.

                    PixelScript leverages optical character recognition (OCR) algorithms to swiftly and accurately 
                    recognize text within images, allowing you to easily convert them into editable and more readable 
                    formats. Whether it's scanned documents, images, or screenshots, PixelScript efficiently 
                    extracts the text and puts it at your fingertips.

                    <br />
                    <br />

                    Sign up now to start extracting text from images like never before!
                    </p>
                </div>

                <div className="flex flex-row justify-center gap-5 sm:pl-40 py-10">
                    <button className="bg-[#00ffef] text-[#374151] rounded-lg w-20 h-10 hover:bg-[#77fff7] button-hover">
                        Sign In
                    </button>
                    <button className="bg-[#00ffef] text-[#374151] rounded-lg w-20 h-10 hover:bg-[#77fff7] button-hover">
                        Sign Up
                    </button>
                </div>
            </div>
        </section>
    )
}
