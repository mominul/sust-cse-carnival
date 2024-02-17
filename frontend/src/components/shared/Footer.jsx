import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-800 text-white p-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div>
              <h1 className="text-2xl font-semibold mb-3">About Us</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                quidem, voluptas, autem, quos quas quia quibusdam necessitatibus
                voluptates quod quae.
              </p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-3">Contact Us</h1>
              <p>
                <span className="font-semibold">Address: </span> 123, ABC
                Street, XYZ City, Country
              </p>
              <p>
                <span className="font-semibold">Phone: </span> +123 456 789
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                <a href="mailto:user@gmail.com">user@gmail.com</a>
              </p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-3">Follow Us</h1>
              <div className="flex gap-2">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
