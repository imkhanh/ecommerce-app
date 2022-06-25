import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsDribbble, BsTwitter, BsGithub } from 'react-icons/bs';

const Footer = () => {
	return (
		<footer className="mt-64 text-white bg-black grid grid-cols-5">
			<aside className="lg:hidden relative col-span-2 block">
				<img className="absolute inset-0 object-cover w-full h-full" src="https://images.unsplash.com/photo-1624456735729-03594a40c5fb" alt="Comic Graphic" />
			</aside>
			<div className="sm:px-4 py-16 lg:px-6 px-8 col-span-3 lg:col-span-5">
				<div className="grid sm:grid-cols-1 gap-8 grid-cols-2">
					<div>
						<p className="font-medium">
							<span className="text-xs tracking-widest uppercase">Call</span>
							<Link to="/" className="block text-2xl sm:text-3xl hover:opacity-75">
								0123456789
							</Link>
						</p>
						<ul className="mt-8 space-y-2 text-sm">
							<li>Monday to Friday: 10am - 5pm</li>
							<li>Weekend: 10am - 3pm</li>
						</ul>
						<div className="flex mt-16 space-x-3">
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<span className="sr-only"> Facebook </span>
								<BsFacebook />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<span className="sr-only"> Instagram </span>
								<BsInstagram />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<span className="sr-only"> Twitter </span>
								<BsTwitter />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<span className="sr-only"> GitHub </span>
								<BsGithub />
							</Link>
							<Link to="/" className="p-2 border rounded-full border-white/25 hover:opacity-75">
								<span className="sr-only"> Dribbble </span>
								<BsDribbble />
							</Link>
						</div>
					</div>
					<div className="grid  gap-4 grid-cols-2">
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
						<p className="sm:mt-4 mt-0">© 2022 e-Commerce shop.</p>
					</div>
					<p className="mt-8 text-xs text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus mollitia quia quod repellendus. Porro harum, odio dolore perspiciatis praesentium provident esse consequatur quibusdam aperiam, cupiditate omnis modi in quasi? In, maxime odio
						vel repellat sed earum? Debitis quaerat facilis animi. Odio natus nostrum laboriosam impedit magnam praesentium asperiores consectetur ipsum.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
