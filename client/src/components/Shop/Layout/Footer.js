import React from 'react';
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="text-white bg-black grid grid-cols-5">
			<aside className="lg:hidden relative col-span-2 block">
				<img className="absolute inset-0 object-cover w-full h-full" src="https://images.unsplash.com/photo-1624456735729-03594a40c5fb" alt="Comic Graphic" />
			</aside>
			<div className="sm:px-4 py-16 lg:px-6 px-8 col-span-3 lg:col-span-5">
				<div className="grid sm:grid-cols-1 gap-8 grid-cols-2">
					<div>
						<p className="font-medium">
							<span className="text-xs tracking-widest uppercase">Call</span>
							<Link to="/" className="block sm:text-2xl text-3xl hover:opacity-75">
								0123456789
							</Link>
						</p>
						<ul className="mt-8 space-y-2 text-sm">
							<li>Monday to Friday: 10am - 5pm</li>
							<li>Weekend: 10am - 3pm</li>
						</ul>
						<div className="flex md:justify-center md:items-center mt-16 space-x-3">
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<BsInstagram />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<BsFacebook />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<BsYoutube />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<BsTwitter />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<BsDribbble />
							</Link>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="font-medium">Support</p>
							<nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-300">
								<Link to="/" className="hover:opacity-75">
									Contact
								</Link>
								<Link to="/" className="hover:opacity-75">
									FAQs
								</Link>
								<Link to="/" className="hover:opacity-75">
									Live Chat
								</Link>
								<Link to="/" className="hover:opacity-75">
									Forums
								</Link>
							</nav>
						</div>
						<div>
							<p className="font-medium">Products</p>
							<nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-300">
								<Link to="/" className="hover:opacity-75">
									1to1 Coaching
								</Link>
								<Link to="/" className="hover:opacity-75">
									Lesson Plans
								</Link>
								<Link to="/" className="hover:opacity-75">
									Meal Plans
								</Link>
								<Link to="/" className="hover:opacity-75">
									Gym Sessions
								</Link>
							</nav>
						</div>
					</div>
				</div>
				<div className="pt-12 mt-12 border-t border-gray-800">
					<div className="text-sm text-gray-300 items-center justify-between flex md:flex-col">
						<div className="flex space-x-3">
							<Link to="/" className="hover:opacity-75">
								Privacy Policy
							</Link>
							<Link to="/" className="hover:opacity-75">
								Terms &amp; Conditions
							</Link>
							<Link to="/" className="hover:opacity-75">
								Returns Policy
							</Link>
						</div>
						<p className="md:mt-4">© onedayonething.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
