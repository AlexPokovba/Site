const products = [
  {
    name: 'Adjustable Dumbbells Set',
    image: '/images/dumbbells.jpg',
    description:
      'Versatile adjustable dumbbells to target multiple muscle groups. Perfect for home workouts.',
    brand: 'FitPro',
    category: 'Fitness',
    price: 149.99,
    countInStock: 25,
    rating: 4.7,
    numReviews: 35,
  },
  {
    name: 'Resistance Bands Set',
    image: '/images/resistance_bands.jpg',
    description:
      'Set of 5 resistance bands for strength training and flexibility exercises.',
    brand: 'PowerFlex',
    category: 'Fitness',
    price: 29.99,
    countInStock: 50,
    rating: 4.6,
    numReviews: 72,
  },
  {
    name: 'Yoga Mat',
    image: '/images/yoga_mat.jpg',
    description:
      'Non-slip yoga mat for comfort and stability during your yoga and pilates sessions.',
    brand: 'PureYoga',
    category: 'Yoga',
    price: 19.99,
    countInStock: 40,
    rating: 4.8,
    numReviews: 60,
  },
  {
    name: 'Kettlebell Set',
    image: '/images/kettlebells.jpg',
    description:
      'Kettlebell set for full-body workout, improving strength, stability, and endurance.',
    brand: 'KettleForce',
    category: 'Fitness',
    price: 99.99,
    countInStock: 15,
    rating: 4.5,
    numReviews: 50,
  },
  {
    name: 'Protein Powder (Vanilla Flavor)',
    image: '/images/protein_powder.jpg',
    description:
      'High-quality whey protein powder for muscle recovery and growth, with a delicious vanilla flavor.',
    brand: 'MuscleFuel',
    category: 'Nutrition',
    price: 39.99,
    countInStock: 30,
    rating: 4.7,
    numReviews: 120,
  },
  {
    name: 'Foam Roller',
    image: '/images/foam_roller.jpg',
    description:
      'Foam roller for muscle recovery, reducing soreness, and improving flexibility.',
    brand: 'RecoveryPro',
    category: 'Fitness',
    price: 24.99,
    countInStock: 60,
    rating: 4.6,
    numReviews: 100,
  },
  {
    name: 'Exercise Ball',
    image: '/images/exercise_ball.jpg',
    description:
      'Durable exercise ball for core strengthening and stability exercises.',
    brand: 'BalanceFit',
    category: 'Fitness',
    price: 22.99,
    countInStock: 40,
    rating: 4.4,
    numReviews: 80,
  },
  {
    name: 'Jump Rope',
    image: '/images/jump_rope.jpg',
    description:
      'Lightweight jump rope perfect for cardio workouts and improving coordination.',
    brand: 'SpeedRope',
    category: 'Cardio',
    price: 12.99,
    countInStock: 100,
    rating: 4.8,
    numReviews: 150,
  },
  {
    name: 'Treadmill',
    image: '/images/treadmill.jpg',
    description:
      'High-performance treadmill with multiple workout modes and heart rate monitoring.',
    brand: 'RunFit',
    category: 'Cardio',
    price: 499.99,
    countInStock: 10,
    rating: 4.6,
    numReviews: 40,
  },
  {
    name: 'Adjustable Weight Bench',
    image: '/images/weight_bench.jpg',
    description:
      'Adjustable workout bench with multiple incline and flat positions for strength training.',
    brand: 'PowerBench',
    category: 'Fitness',
    price: 129.99,
    countInStock: 20,
    rating: 4.5,
    numReviews: 30,
  },
  {
    name: 'Yoga Blocks',
    image: '/images/yoga_blocks.jpg',
    description:
      'Set of two yoga blocks for better alignment and support during your practice.',
    brand: 'ZenFlow',
    category: 'Yoga',
    price: 14.99,
    countInStock: 80,
    rating: 4.7,
    numReviews: 110,
  },
  {
    name: 'Bicep Curl Bar',
    image: '/images/bicep_curl_bar.jpg',
    description:
      'Ergonomically designed bicep curl bar for arm workouts and improving muscle definition.',
    brand: 'MuscleGrip',
    category: 'Fitness',
    price: 49.99,
    countInStock: 25,
    rating: 4.5,
    numReviews: 45,
  },
  {
    name: 'Pull-Up Bar',
    image: '/images/pull_up_bar.png',
    description:
      'Wall-mounted pull-up bar for upper body strength training and muscle building.',
    brand: 'StrengthX',
    category: 'Fitness',
    price: 39.99,
    countInStock: 18,
    rating: 4.6,
    numReviews: 65,
  },
  {
    name: 'Water Bottle (1L)',
    image: '/images/water_bottle.jpg',
    description:
      'Durable water bottle with capacity for hydration during your workouts.',
    brand: 'HydraBottle',
    category: 'Accessories',
    price: 15.99,
    countInStock: 150,
    rating: 4.9,
    numReviews: 220,
  },
  {
    name: 'Dumbbell Rack',
    image: '/images/dumbbell_rack.jpg',
    description:
      'Sturdy rack for organizing your dumbbells and saving space in your home gym.',
    brand: 'GymTech',
    category: 'Fitness',
    price: 79.99,
    countInStock: 10,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: 'AB Wheel',
    image: '/images/ab_wheel.jpg',
    description:
      'Compact and efficient ab wheel for strengthening your core and improving stability.',
    brand: 'CoreFit',
    category: 'Fitness',
    price: 14.99,
    countInStock: 60,
    rating: 4.7,
    numReviews: 90,
  },
  {
    name: 'TRX Suspension Trainer',
    image: '/images/trx_trainer.jpg',
    description:
      'Suspension trainer for bodyweight exercises that build strength, balance, and flexibility.',
    brand: 'TRXFit',
    category: 'Fitness',
    price: 119.99,
    countInStock: 20,
    rating: 4.8,
    numReviews: 75,
  },
  {
    name: 'Ankle Weights',
    image: '/images/ankle_weights.jpg',
    description:
      'Adjustable ankle weights to enhance your cardio and strength training workouts.',
    brand: 'FitTone',
    category: 'Fitness',
    price: 18.99,
    countInStock: 100,
    rating: 4.5,
    numReviews: 130,
  },
  {
    name: 'Boxing Gloves',
    image: '/images/boxing_gloves.jpg',
    description:
      'Durable boxing gloves for training and sparring, offering protection and comfort.',
    brand: 'PunchPro',
    category: 'Boxing',
    price: 34.99,
    countInStock: 40,
    rating: 4.6,
    numReviews: 60,
  },
  {
    name: 'Jump Box',
    image: '/images/jump_box.jpg',
    description:
      'Plyometric jump box for explosive training to increase your vertical jump and leg strength.',
    brand: 'PlyoFit',
    category: 'Fitness',
    price: 79.99,
    countInStock: 15,
    rating: 4.7,
    numReviews: 50,
  },
];

export default products;
