import SideNavigation from "../reusableui/SideNavigation";
import Header from "../reusableui/Header";

const Index = (props) => {
	return (
		<div className="flex bg-[#E5E5E5] min-h-screen h-full">
			<div>
				<SideNavigation />
			</div>
			<div className="ml-[260px] w-full h-full">
				<Header />
				{/* body */}
				<div className="mt-8 px-7 h-full">{props.children}</div>
			</div>
		</div>
	);
};

export default Index;
