import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-white flex items-center justify-center">
            <div className="w-full">
                {/* Copyright Section */}
                <div className="border-t border-gray-300 pt-4 pb-4">
                    <p className="text-base text-gray-600 text-center">
                        &copy; {new Date().getFullYear()} Stonks Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;   