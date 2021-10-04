import { format } from 'date-fns'
import { v4 as keyGen } from 'uuid'

//Components
import InforCard from '../components/InforCard'
import Map from '../components/Map'

function Search({ searchResults, location, range, noOfGuests }) {

    return (
        <main className="flex">

            <section className="flex-grow pt-14 px-6">
                <p className="text-xs">+300 Stays - {range} - for {noOfGuests} guests</p>

                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Type of Place</p>
                    <p className="button">Price</p>
                    <p className="button">Rooms and Beds</p>
                    <p className="button">More filters</p>
                </div>

                <div className="flex flex-col">

                    {
                        searchResults.map(({ img, location, title, description, star, price, total }) => (
                            <InforCard
                                key={keyGen()}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))
                    }
                </div>

            </section>

            <section className="hidden xl:inline-flex xl:min-w-[600px]">
                <Map data={searchResults} />
            </section>
        </main>
    )
}

export async function getServerSideProps({ query }) {

    if (!query.location || !query.startDate || !query.endDate || !query.noOfGuests) {

        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {},
        }
    }

    const searchResults = await fetch('https://links.papareact.com/isz').then(res => res.json())

    const { location, startDate, endDate, noOfGuests } = query
    const formattedStartDate = format(new Date(startDate), 'dd MMM yy')
    const formattedEndDate = format(new Date(endDate), 'dd MMM yy')
    const range = `${formattedStartDate} | ${formattedEndDate}`

    return {
        props: {
            searchResults: searchResults || [],
            location,
            noOfGuests,
            range,
            headerPlaceholder: `${location} | ${range} | ${noOfGuests}`
        }
    }
}

export default Search