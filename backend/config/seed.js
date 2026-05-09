import dotenv from 'dotenv';
import connectDB from './db.js';
import Package from '../models/Package.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const seedPackages = async () => {
  try {
    await Package.deleteMany();

    const packages = [
      {
        name: 'Aberdare National Park',
        location: 'Kenya',
        description: 'Experience the mystical Aberdare Range with its dense forests, waterfalls, and unique tree hotels. Home to elephants, leopards, and the rare bongo antelope.',
        price: 90,
        originalPrice: 120,
        duration: '3 Days',
        image: 'images/AberdareNP.jpeg',
        images: ['images/AberdareNP.jpeg'],
        rating: 4.0,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 15,
        amenities: ['Tree Hotel Accommodation', 'All Meals', 'Game Drives', 'Professional Guide'],
        itinerary: [
          { day: 1, description: 'Arrival and check-in at tree hotel' },
          { day: 2, description: 'Full day game drives and waterfall visits' },
          { day: 3, description: 'Morning nature walk and departure' },
        ],
      },
      {
        name: 'Amboseli National Park',
        location: 'Kenya',
        description: 'Witness majestic elephants with Mount Kilimanjaro as your backdrop. Famous for large elephant herds, diverse wildlife, and breathtaking views.',
        price: 95,
        originalPrice: 125,
        duration: '3 Days',
        image: 'images/AmboseliNP.jpeg',
        images: ['images/AmboseliNP.jpeg'],
        rating: 4.5,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 20,
        amenities: ['Lodge Accommodation', 'All Meals', 'Game Drives', 'Mountain Views'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Full day game drives with Kilimanjaro views' },
          { day: 3, description: 'Morning game drive and departure' },
        ],
      },
      {
        name: 'Lake Nakuru National Park',
        location: 'Kenya',
        description: 'Famous for millions of flamingos painting the lake pink. Home to rhinos, lions, and over 450 bird species in a stunning alkaline lake setting.',
        price: 85,
        originalPrice: 115,
        duration: '2 Days',
        image: 'images/L.NakuruNP.jpeg',
        images: ['images/L.NakuruNP.jpeg'],
        rating: 4.8,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 12,
        amenities: ['Lodge Accommodation', 'All Meals', 'Game Drives', 'Bird Watching'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Morning game drive and departure' },
        ],
      },
      {
        name: 'Marsabit National Park',
        location: 'Kenya',
        description: 'Explore volcanic landscapes and ancient crater lakes in northern Kenya. Unique desert-adapted wildlife and rich cultural heritage of the Borana people.',
        price: 110,
        originalPrice: 150,
        duration: '3 Days',
        image: 'images/MarsabitNP.jpeg',
        images: ['images/MarsabitNP.jpeg'],
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 10,
        amenities: ['Camp Accommodation', 'All Meals', 'Game Drives', 'Cultural Experience'],
        itinerary: [
          { day: 1, description: 'Arrival and crater lake visit' },
          { day: 2, description: 'Full day exploration of volcanic landscapes' },
          { day: 3, description: 'Cultural visit and departure' },
        ],
      },
      {
        name: 'Maasai Mara Game Reserve',
        location: 'Kenya',
        description: 'Home to the Great Wildebeest Migration and Big Five. Endless savannahs teeming with wildlife and authentic Maasai cultural experiences.',
        price: 150,
        originalPrice: 200,
        duration: '4 Days',
        image: 'images/MasaiMaraGR.jpeg',
        images: ['images/MasaiMaraGR.jpeg'],
        rating: 4.9,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 14,
        amenities: ['Tented Camp', 'All Meals', 'Game Drives', 'Maasai Village Visit'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Full day game drives' },
          { day: 3, description: 'Morning game drive and Maasai village visit' },
          { day: 4, description: 'Morning game drive and departure' },
        ],
      },
      {
        name: 'Meru National Park',
        location: 'Kenya',
        description: 'Untamed wilderness with diverse ecosystems from forests to savannah. Home to rhinos, lions, and Elsa the lioness from Born Free fame.',
        price: 100,
        originalPrice: 135,
        duration: '3 Days',
        image: 'images/MeruNP.jpeg',
        images: ['images/MeruNP.jpeg'],
        rating: 4.6,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 12,
        amenities: ['Lodge Accommodation', 'All Meals', 'Game Drives', 'Guided Walks'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Full day game drives' },
          { day: 3, description: 'Morning game drive and departure' },
        ],
      },
      {
        name: 'Mt. Kenya National Park',
        location: 'Kenya',
        description: 'Africa\'s second highest peak with stunning alpine scenery. Climb to snowy peaks or explore diverse ecosystems from tropical forest to moorland.',
        price: 180,
        originalPrice: 250,
        duration: '5 Days',
        image: 'images/Mt.KeNP.jpeg',
        images: ['images/Mt.KeNP.jpeg'],
        rating: 4.8,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 10,
        amenities: ['Mountain Huts', 'All Meals', 'Porters', 'Professional Guide'],
        itinerary: [
          { day: 1, description: 'Arrival and preparation' },
          { day: 2, description: 'Start climb through forest zone' },
          { day: 3, description: 'Reach moorland zone' },
          { day: 4, description: 'Summit attempt and descent' },
          { day: 5, description: 'Complete descent and departure' },
        ],
      },
      {
        name: 'Nairobi National Park',
        location: 'Kenya',
        description: 'Unique wildlife experience just minutes from the city skyline. Home to rhinos, lions, giraffes, and over 400 bird species against an urban backdrop.',
        price: 75,
        originalPrice: 100,
        duration: '1 Day',
        image: 'images/NairobiNP.jpeg',
        images: ['images/NairobiNP.jpeg'],
        rating: 4.5,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 20,
        amenities: ['Day Trip', 'Lunch', 'Game Drives', 'Pick-up/Drop-off'],
        itinerary: [
          { day: 1, description: 'Morning game drive, lunch, and afternoon game drive' },
        ],
      },
      {
        name: 'Samburu National Reserve',
        location: 'Kenya',
        description: 'Home to the Special Five: Grevy\'s zebra, reticulated giraffe, Somali ostrich, Beisa oryx, and gerenuk. Unique northern Kenya wildlife experience.',
        price: 120,
        originalPrice: 160,
        duration: '3 Days',
        image: 'images/SamburuNR.jpeg',
        images: ['images/SamburuNR.jpeg'],
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 12,
        amenities: ['Lodge Accommodation', 'All Meals', 'Game Drives', 'Cultural Visit'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Full day game drives' },
          { day: 3, description: 'Morning game drive and departure' },
        ],
      },
      {
        name: 'Sibiloi National Park',
        location: 'Kenya',
        description: 'UNESCO World Heritage site known as the "Cradle of Mankind." Prehistoric fossils, archaeological discoveries, and unique desert ecosystem near Lake Turkana.',
        price: 200,
        originalPrice: 280,
        duration: '4 Days',
        image: 'images/SibiloiNP.jpeg',
        images: ['images/SibiloiNP.jpeg'],
        rating: 4.6,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 8,
        amenities: ['Camp Accommodation', 'All Meals', 'Archaeological Tours', 'Lake Turkana Visit'],
        itinerary: [
          { day: 1, description: 'Arrival and archaeological site visit' },
          { day: 2, description: 'Full day fossil exploration' },
          { day: 3, description: 'Lake Turkana visit' },
          { day: 4, description: 'Morning exploration and departure' },
        ],
      },
      {
        name: 'Tsavo East National Park',
        location: 'Kenya',
        description: 'Kenya\'s largest park with vast open plains and the famous red elephants. Home to lions, cheetahs, and the Lugard Falls.',
        price: 130,
        originalPrice: 175,
        duration: '3 Days',
        image: 'images/TsavoE_NP.jpeg',
        images: ['images/TsavoE_NP.jpeg'],
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 14,
        amenities: ['Lodge Accommodation', 'All Meals', 'Game Drives', 'Guided Tours'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Full day game drives including Lugard Falls' },
          { day: 3, description: 'Morning game drive and departure' },
        ],
      },
      {
        name: 'Tsavo West National Park',
        location: 'Kenya',
        description: 'Dramatic landscapes with volcanic cones, lava flows, and Mzima Springs. Famous for black rhinos and diverse wildlife habitats.',
        price: 130,
        originalPrice: 175,
        duration: '3 Days',
        image: 'images/TsavoW_NP.jpeg',
        images: ['images/TsavoW_NP.jpeg'],
        rating: 4.7,
        reviewCount: 0,
        featured: true,
        available: true,
        maxGuests: 14,
        amenities: ['Lodge Accommodation', 'All Meals', 'Game Drives', 'Mzima Springs Visit'],
        itinerary: [
          { day: 1, description: 'Arrival and afternoon game drive' },
          { day: 2, description: 'Full day exploration including Mzima Springs' },
          { day: 3, description: 'Morning game drive and departure' },
        ],
      },
    ];

    await Package.insertMany(packages);
    console.log('Packages seeded successfully');
  } catch (error) {
    console.error('Error seeding packages:', error);
  }
};

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@tours.com' });
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@tours.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created. Email: admin@tours.com, Password: admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

const seedData = async () => {
  await seedPackages();
  await seedAdmin();
  process.exit(0);
};

seedData();
