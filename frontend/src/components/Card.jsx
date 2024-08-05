import Cards from "./Cards";


const Card = () => {
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				<Cards cardType={"saving"} />
				<Cards cardType={"expense"} />
				<Cards cardType={"investment"} />
				<Cards cardType={"investment"} />
				<Cards cardType={"saving"} />
				<Cards cardType={"expense"} />
			</div>
		</div>
	);
};
export default Card;