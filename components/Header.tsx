import Link from "next/link"

function Header() {
  return (
    <header className="flex items-center justify-between p-5 max-w-7xl mx-auto">
        <div className="flex items-center space-x-5">
            {/* If u use <Link> Component inside the page, the page actually linked to, it'll pre-fetch the page by default */}
            <Link href="/">
                <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="medium logo" />
            </Link>

            <div className="hidden md:inline-flex items-center space-x-5">
                <h3>About</h3>
                <h3>Contact</h3>
                <h3 className="text-white bg-green-600 px-4 py-1 rounded-full cursor-pointer hover:bg-green-700">Follow</h3>
            </div>

        </div>

        <div className="flex items-center space-x-5 text-green-600">
            <h3 className="cursor-pointer hover:text-green-900">Sign In</h3>
            <h3 className="text-green border px-4 py-1 rounded-full border-green-600 cursor-pointer hover:bg-green-600 hover:text-white">Get Started</h3>
        </div>
    </header>
  )
}

export default Header
