/* ==========================================================================
   Laxmi's Kitchen — menu content
   Edit names, prices, descriptions and photos here.
   Photos live in assets/images/menu/ and are referenced by file name.
   ========================================================================== */

window.LAXMI_MENU = {
  restaurant: {
    name: "Laxmi’s Kitchen",
    shortName: "Laxmi’s",
    tagline: "Home-style vegetarian",
    phoneDisplay: "+91 85914 24627",
    phoneHref: "+918591424627",
    email: "sharmaarchana72503@gmail.com",
    hours: "9:00 AM – 9:30 PM",
    hoursNote: "Open daily",
    address:
      "A 1105, The Pavilion, Near Chintamani Dyanpeeth School, Opp. Pawar Furniture, Ambegaon Bk, Pune 411046, Maharashtra",
    addressShort: "Ambegaon Bk, Pune",
    mapsQuery:
      "Laxmi's Kitchen, A 1105, The Pavilion, Ambegaon Bk, Pune 411046",
    tiffin: "Tiffin service available",
    priceNote: "Prices are in INR and inclusive of taxes",
    photoNote: "Photographs are representative of our dishes"
  },

  featured: [
    { slug: "veg-thali", note: "A little bit of everything" },
    { slug: "idli-sambhar", note: "Soft, warm & comforting" },
    { slug: "paneer-kadhai", note: "Bold house-made masala" }
  ],

  categories: [
    {
      id: "snacks",
      number: "01",
      eyebrow: "All-day favourites",
      title: "Nashta & Snacks",
      description: "Small comforts, prepared fresh through the day.",
      items: [
        {
          slug: "bread-pakoda",
          name: "Bread Pakoda",
          price: "20",
          description: "Crisp gram-flour jacket, spiced potato filling."
        },
        {
          slug: "vada-paav",
          name: "Vada Paav",
          price: "20",
          description: "Soft paav, crunchy vada and garlic chutney."
        },
        {
          slug: "samosa",
          name: "Samosa",
          price: "25",
          description: "Golden pastry with a spiced potato and pea filling.",
          popular: true
        },
        {
          slug: "poha",
          name: "Poha",
          price: "40",
          description: "Lightly tempered with peanuts and lemon."
        },
        {
          slug: "idli-sambhar",
          name: "Idli Sambhar",
          price: "50",
          description: "Steamed rice cakes, lentil sambhar and house chutney.",
          popular: true
        },
        {
          slug: "veg-sandwich",
          name: "Veg Sandwich",
          price: "75",
          description: "Garden vegetables and chutney on soft house bread."
        },
        {
          slug: "veg-grilled-sandwich",
          name: "Veg Grilled Sandwich",
          price: "90",
          description: "Buttered, grilled and layered with fresh vegetables."
        },
        {
          slug: "veg-hakka-noodles",
          name: "Veg Hakka Noodles",
          price: "120",
          description: "Wok-tossed noodles with crisp vegetables."
        },
        {
          slug: "veg-manchurian",
          name: "Veg Manchurian",
          price: "180",
          description: "Vegetable dumplings in a tangy-sweet gravy."
        },
        {
          slug: "veg-chilli-paneer",
          name: "Veg Chilli Paneer",
          price: "200",
          description: "Golden paneer, peppers and a bold house sauce."
        }
      ]
    },
    {
      id: "mains",
      number: "02",
      eyebrow: "Ghar ka khaana",
      title: "Wholesome Mains",
      description: "Slow-cooked vegetables, honest spices, satisfying portions.",
      items: [
        {
          slug: "puri-bhaji",
          name: "Puri Bhaji",
          price: "70",
          description: "Puffed puris with a warm, spiced potato bhaji."
        },
        {
          slug: "paav-bhaji",
          name: "Paav Bhaji",
          price: "90",
          description: "Buttery mashed vegetables with toasted paav.",
          popular: true
        },
        {
          slug: "veg-thali",
          name: "Veg Thali",
          price: "100",
          description: "A balanced home-style meal, served with love.",
          popular: true
        },
        {
          slug: "veg-biryani",
          name: "Veg Biryani",
          price: "200",
          description: "Fragrant basmati, vegetables and whole spices."
        },
        {
          slug: "dal-fry",
          name: "Dal Fry",
          price: "110",
          description: "Yellow lentils with a gentle ghee tempering."
        },
        {
          slug: "dal-tadka",
          name: "Dal Tadka",
          price: "125",
          description: "Slow-cooked dal finished with a sizzling tadka.",
          popular: true
        },
        {
          slug: "aloo-matar",
          name: "Aloo Matar",
          price: "100",
          description: "Potatoes and green peas in a gentle tomato masala."
        },
        {
          slug: "aloo-palak",
          name: "Aloo Palak",
          price: "90",
          description: "Potatoes folded through fresh spinach."
        },
        {
          slug: "bhindi-masala",
          name: "Bhindi Masala",
          price: "130",
          description: "Okra tossed with onions, tomatoes and spices."
        },
        {
          slug: "bhindi-fry",
          name: "Bhindi Fry",
          price: "150",
          description: "Crisp okra with simple seasoning and a little heat."
        },
        {
          slug: "aloo-jeera",
          name: "Aloo Jeera",
          price: "90",
          description: "Cumin-kissed potatoes, light and comforting."
        },
        {
          slug: "mix-veg",
          name: "Mix Veg",
          price: "130",
          description: "Seasonal vegetables in a homely masala."
        },
        {
          slug: "veg-kadhai",
          name: "Veg Kadhai",
          price: "150",
          description: "Vegetables simmered in a bold kadhai gravy."
        }
      ]
    },
    {
      id: "paneer",
      number: "03",
      eyebrow: "Rich & comforting",
      title: "Paneer Specials",
      description: "Fresh paneer folded into our house-made gravies.",
      items: [
        {
          slug: "paneer-kadhai",
          name: "Paneer Kadhai",
          price: "200",
          description: "Fresh paneer, peppers and house-made kadhai masala.",
          popular: true
        },
        {
          slug: "shahi-paneer",
          name: "Shahi Paneer",
          price: "200",
          description: "Paneer in a silky cashew-tomato gravy."
        },
        {
          slug: "palak-paneer",
          name: "Palak Paneer",
          price: "180",
          description: "Fresh spinach, soft paneer and warm spices.",
          popular: true
        },
        {
          slug: "paneer-bhurji",
          name: "Paneer Bhurji",
          price: "200",
          description: "Crumbled paneer, onions, tomatoes and coriander."
        },
        {
          slug: "paneer-do-pyaza",
          name: "Paneer Do Pyaza",
          price: "200",
          description: "Paneer and sweet onions in a rich, slow-cooked gravy."
        }
      ]
    },
    {
      id: "rice-breads",
      number: "04",
      eyebrow: "Complete your meal",
      title: "Rice & Breads",
      description: "Made to order, best enjoyed warm.",
      items: [
        {
          slug: "wheat-roti",
          name: "Wheat Roti",
          price: "10",
          description: "Soft whole-wheat roti, made to order."
        },
        {
          slug: "butter-wheat-roti",
          name: "Butter Wheat Roti",
          price: "15",
          description: "Whole-wheat roti with a brush of butter."
        },
        {
          slug: "jeera-rice",
          name: "Jeera Rice",
          price: "75 / 120",
          priceLabel: "75 rupees half, 120 rupees full",
          priceNote: "Half / full",
          description: "Basmati rice tossed with toasted cumin."
        },
        {
          slug: "veg-pulao",
          name: "Veg Pulao",
          price: "125",
          description: "Fragrant rice with garden vegetables."
        },
        {
          slug: "paneer-pulao",
          name: "Paneer Pulao",
          price: "150",
          description: "Basmati, paneer and whole spices."
        },
        {
          slug: "steam-rice",
          name: "Steam Rice",
          price: "50 / 80",
          priceLabel: "50 rupees half, 80 rupees full",
          priceNote: "Half / full",
          description: "Simple steamed basmati."
        },
        {
          slug: "dal-khichdi",
          name: "Dal Khichdi",
          price: "70 / 120",
          priceLabel: "70 rupees half, 120 rupees full",
          priceNote: "Half / full",
          description: "Rice and lentils, cooked soft and comforting."
        }
      ]
    }
  ]
};
