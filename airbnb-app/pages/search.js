import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/infoCard';

function Search({searchResults}) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query; // ES6 destructuring
  const formattedStartDate = format(new Date(startDate), 'yy-MMM-dd');
  const formattedEndDate = format(new Date(endDate), 'yy-MMM-dd');
  const range = `${formattedStartDate} - ${formattedEndDate}`; 
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">300+ Stays - {range} - for {noOfGuests} Guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-5">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Roons and Beds</p>
            <p className="button">Mores filters</p>
          </div>
          <div className="flex flex-col">
          {searchResults.map(({img, title, description, price, star, total, location}) => (
            <InfoCard 
              key={img}
              img={img}
              location={location}
              title={title}
              description={description}
              star={star}
              price={price}
              total={total}
            />
          ))}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json());

  return {
    props: {
      searchResults,
    }
  }
}
