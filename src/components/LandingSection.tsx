import { Link } from "react-router-dom"

export const LandingSection = () => {
    const access_token = localStorage.getItem("access_token");
    const loggedIn: string = access_token ? access_token : 'undefined';

    return (
        <section className="bg-[#374151] w-full min-h-screen sm:pt-20 pt-16">
            <div className="w-full h-full sm:flex items-center sm:px-24 py-10 px-2">
                <div className="bg-[#293241] sm:w-[60vw] w-full min-h-[450px] rounded-3xl sm:p-10 p-5">
                    <span className="text-[60px] text-[#e0fbfc]">Introducing PixelScript.</span>
                    <br />
                    <br />

                    <p className="text-[#ffffff] font-light text-[20px] tracking-widest leading-[30px]">
                    
                    Your go-to solution for effortlessly extracting text from images. 
                    Say goodbye to manual typing as our cutting-edge technology empowers you to unlock the 
                    hidden potential of images.

                    PixelScript leverages optical character recognition (OCR) algorithms to swiftly and accurately 
                    recognize text within images, allowing you to easily convert them into editable and fast readable 
                    formats (<b className="font-semibold">Bionic Reading Method</b>). Whether it's scanned documents, images, or screenshots, PixelScript efficiently 
                    extracts the text and puts it at your fingertips.

                    <br />
                    <br />

                    Sign up now to start extracting text from images like never before!
                    </p>
                </div>

                <div className="flex flex-col sm:w-[35vw] w-full justify-center gap-5 sm:pl-40 py-10">
                    <div className="w-full flex flex-col justify-center px-5">
                        <h2 className="text-[30px] text-[#e0fbfc]">What is Bionic reading?</h2>
                        <p
                            className="text-white font-light text-[16px] tracking-widest leading-[30px] pt-5"
                        >
                            Bionic reading helps readers by guiding the eyes through text with artificial fixation points.
                            This makes the reader to only focus on bolded initial letters and let the brain center complete 
                            the word. This results in faster reading, in-depth reading and more understanding of the content 
                            being read.
                        </p>
                    </div>
                    <div className={loggedIn !== 'undefined' ? 'hidden' : 'w-full flex flex-row justify-center gap-5 pt-5'}>
                        <Link
                            to={"/signin"}
                        >
                            <button className="bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover">
                                Sign In
                            </button>
                        </Link>

                        <Link
                            to={"/signup"}
                        >
                            <button className="bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
