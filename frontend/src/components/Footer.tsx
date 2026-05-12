import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amazon-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-amazon-orange">Get to Know Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amazon-orange">About Amazon Clone</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Careers</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Press Release</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-amazon-orange">Connect with Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amazon-orange">Facebook</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Twitter</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-amazon-orange">Make Money with Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amazon-orange">Sell on Amazon Clone</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Become an Affiliate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-amazon-orange">Help & Settings</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amazon-orange">Your Account</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Help Center</a></li>
              <li><a href="#" className="hover:text-amazon-orange">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2024 Amazon Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
