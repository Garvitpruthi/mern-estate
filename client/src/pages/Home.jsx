import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';
import videoFile from '../assets//7578552-uhd_3840_2160_30fps.mp4';
import Footer  from '../components/Footer'

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  SwiperCore.use([Navigation])

  // console.log(saleListings)
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json(); 
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prevState) => {
      if (prevState.includes(sectionIndex)) {
        return prevState.filter((idx) => idx !== sectionIndex);
      } else {
        return [...prevState, sectionIndex];
      }
    });
  };
  const sections = [
    {
      title: 'what is  WoodlandEscape and does it work?',
      content: 'WoodlandEscape is a rental and real estate website designed to connect individuals with serene properties nestled amidst wooded areas or natural landscapes. It serves as a platform for users to discover and book charming cottages, cabins, and homes situated in peaceful woodland settings. Whether youre seeking a weekend retreat or a permanent escape to nature, WoodlandEscape provides a curated selection of properties to meet your needs. Yes, it works by providing users with a seamless browsing experience, detailed property listings, and convenient booking options, facilitating the process of finding the perfect woodland getaway.',
    },
    {
      title: 'How do I use search filters?',
      content: 'Using search filters on WoodlandEscape is easy and convenient. Simply navigate to the search bar on the homepage or designated search page of the website. From there, you can input your desired location, dates of stay, and any specific criteria youre looking for in a woodland property, such as amenities, accommodation type, or price range Once youve entered your search criteria, you can further refine your results using the available filters. These filters typically include options to narrow down your search by property features, such as number of bedrooms, pet-friendly accommodations, proximity to hiking trails, or whether the property has a fireplace or hot tub By adjusting these filters according to your preferences, you can quickly and efficiently find properties that meet your specific needs and preferences. This makes it easier to find the perfect woodland escape for your next getaway.',
    },
    {
      title: 'Are the properties on WoodlandEscape pet-friendly?',
      content: ' Yes, many of the properties listed on WoodlandEscape are pet-friendly. You can use our search filters to specifically look for properties that welcome pets. Be sure to check the property description and amenities list for details on pet policies and any additional fees.',
    },
    {
      title: 'What types of properties can I find on WoodlandEscape?',
      content: 'WoodlandEscape offers a diverse range of properties including cozy cabins, rustic cottages, secluded lodges, and charming chalets, all nestled amidst picturesque woodland settings. Whether youre looking for a romantic retreat for two or a spacious family-friendly getaway, you wll find a variety of options to suit your preferences.',
    },
  ];
  return (
    <div>
      {/* top  */}
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-h-[800px] object-cover"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Explore Our Properties</h2>
            <p className="text-xl mb-8">
              Discover the perfect place to call home with our extensive collection of properties.
            </p>
            <Link
              to="/search"
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>

      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide>
            <div style={{background: url(${listing.imageUrls[0]}) center no-repeat, backgroundSize:"cover"}} className="h-[500px]" key={listing._id}></div>
          </SwiperSlide>
        ))}
      </Swiper> */}
      


      {/* listing results for offer, sale and rent  */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
            
        {/* <div className="container mx-auto">
          <div className="flex flex-col space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                  <span className={transform transition-transform ${expandedSections.includes(index) ? 'rotate-180' : ''}}>
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {expandedSections.includes(index) && (
                  <div className="mt-4 text-gray-600">{sections.content}</div>
                )}
              </div>
            ))}
                    </div> */}    
          <div className="container mx-auto">
            <div className="flex flex-col space-y-4">
              {sections.map((section, index) => (
                <div key={index} className="border-b border-gray-300 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleSection(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                    <span className={`transform transition-transform ${expandedSections.includes(index) ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  {expandedSections.includes(index) && (
                    <div className="mt-4 text-gray-600">{section.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>


        <Footer />
      </div>
      
    // </div>
  )
}

export default Home