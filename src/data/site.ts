import type { ImageMetadata } from 'astro';

export type Lang = 'en' | 'bn';

// Lazy glob so only photos the page uses end up in the build.
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*.jpg');
export const photo = (n: number) => photos[`../assets/work/work-${String(n).padStart(2, '0')}.jpg`]();

export const contact = {
  phone: '01846-846416',
  phoneIntl: '+8801846846416',
  whatsapp: '8801846846416',
  email: 'prottoyabd68@gmail.com',
  facebook: 'https://www.facebook.com/ProttoyaPrintingPackaging',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=18+Sayed+Hasan+Ali+Lane+Babu+Bazar+Dhaka+1100',
};

type L = Record<Lang, string>;

export const services: { id: string; image: number; title: L; body: L; items: Record<Lang, string[]> }[] = [
  {
    id: 'food',
    image: 17,
    title: { en: 'Food & restaurant packaging', bn: 'খাবার ও রেস্টুরেন্ট প্যাকেজিং' },
    body: {
      en: 'Boxes, trays, cones and parcel bags that keep food hot and put your logo in every hand.',
      bn: 'বক্স, ট্রে, কোন আর পার্সেল ব্যাগ। খাবার থাকে গরম, আর আপনার লোগো পৌঁছায় সবার হাতে।',
    },
    items: {
      en: ['Pizza boxes', 'Burger boxes & trays', 'French fry boxes', 'Set menu boxes', 'Paper cones', 'Cup jackets', 'Parcel bags', 'Foil box branding'],
      bn: ['পিৎজা বক্স', 'বার্গার বক্স ও ট্রে', 'ফ্রেঞ্চ ফ্রাই বক্স', 'সেট মেনু বক্স', 'পেপার কোন', 'কাপ জ্যাকেট', 'পার্সেল ব্যাগ', 'ফয়েল বক্স ব্র্যান্ডিং'],
    },
  },
  {
    id: 'sweets',
    image: 62,
    title: { en: 'Sweets, bakery & chocolate', bn: 'মিষ্টি, বেকারি ও চকলেট' },
    body: {
      en: 'Mishti, cake, bento and chocolate boxes on 300 GSM board, with foil and windows.',
      bn: '৩০০ জিএসএম বোর্ডে মিষ্টি, কেক, বেন্টো ও চকলেট বক্স, ফয়েল ও উইন্ডোসহ।',
    },
    items: {
      en: ['Mishti boxes', 'Cake & bento boxes', 'Chocolate boxes', 'Lachcha semai boxes', 'Honey boxes', 'Window dessert boxes'],
      bn: ['মিষ্টির বক্স', 'কেক ও বেন্টো বক্স', 'চকলেট বক্স', 'লাচ্ছা সেমাই বক্স', 'মধুর বক্স', 'উইন্ডো ডেজার্ট বক্স'],
    },
  },
  {
    id: 'retail',
    image: 30,
    title: { en: 'Retail boxes & print', bn: 'রিটেইল বক্স ও প্রিন্ট' },
    body: {
      en: 'Offset-printed product and gift boxes, shopping bags, hang tags, calendars and memo books.',
      bn: 'অফসেট প্রিন্টেড প্রোডাক্ট ও গিফট বক্স, শপিং ব্যাগ, হ্যাং ট্যাগ, ক্যালেন্ডার ও মেমো বই।',
    },
    items: {
      en: ['Product boxes', 'Mobile accessory boxes', 'Apparel & shoe boxes', 'Rigid gift boxes', 'Paper shopping bags', 'Hang tags', 'Calendars', 'Memo & receipt books'],
      bn: ['প্রোডাক্ট বক্স', 'মোবাইল এক্সেসরিজ বক্স', 'পোশাক ও জুতার বক্স', 'রিজিড গিফট বক্স', 'কাগজের শপিং ব্যাগ', 'হ্যাং ট্যাগ', 'ক্যালেন্ডার', 'মেমো ও রিসিট বই'],
    },
  },
  {
    id: 'stickers',
    image: 26,
    title: { en: 'Stickers & labels', bn: 'স্টিকার ও লেবেল' },
    body: {
      en: 'Round, logo and waterproof glossy stickers from 2 Tk a piece, plus cup and jar labels.',
      bn: 'রাউন্ড, লোগো ও ওয়াটারপ্রুফ গ্লসি স্টিকার, প্রতি পিস মাত্র ২ টাকা থেকে।',
    },
    items: {
      en: ['Round stickers', 'Logo stickers', 'Waterproof glossy labels', 'Cup & glass stickers', 'Jar labels'],
      bn: ['রাউন্ড স্টিকার', 'লোগো স্টিকার', 'ওয়াটারপ্রুফ গ্লসি লেবেল', 'কাপ ও গ্লাস স্টিকার', 'জার লেবেল'],
    },
  },
];

export const work: { image: number; title: L }[] = [
  { image: 17, title: { en: 'Burger boxes', bn: 'বার্গার বক্স' } },
  { image: 62, title: { en: 'Premium sweet box', bn: 'প্রিমিয়াম মিষ্টির বক্স' } },
  { image: 26, title: { en: 'Round stickers', bn: 'রাউন্ড স্টিকার' } },
  { image: 14, title: { en: 'Cake boxes', bn: 'কেক বক্স' } },
  { image: 53, title: { en: 'Colourful pizza box', bn: 'কালারফুল পিৎজা বক্স' } },
  { image: 30, title: { en: 'Product boxes', bn: 'প্রোডাক্ট বক্স' } },
  { image: 7, title: { en: 'Cup sticker', bn: 'কাপ স্টিকার' } },
  { image: 42, title: { en: 'Wings box', bn: 'উইংস বক্স' } },
  { image: 10, title: { en: 'Chocolate box', bn: 'চকলেট বক্স' } },
  { image: 55, title: { en: 'French fries box', bn: 'ফ্রেঞ্চ ফ্রাই বক্স' } },
  { image: 34, title: { en: 'Mobile accessory box', bn: 'মোবাইল এক্সেসরিজ বক্স' } },
  { image: 57, title: { en: 'Sandwich box', bn: 'স্যান্ডউইচ বক্স' } },
  { image: 60, title: { en: 'Mishti box', bn: 'মিষ্টির বক্স' } },
  { image: 27, title: { en: 'Cup labels', bn: 'কাপ লেবেল' } },
];

export const cubeFaces = [62, 17, 7, 26, 53];

export const copy = {
  en: {
    meta: {
      title: 'Prottoya Printing & Packaging | Custom boxes, bags & stickers in Dhaka',
      description: 'Custom printed food boxes, sweet boxes, product packaging and stickers from 500 pieces. Display center in Babu Bazar, Dhaka. Delivery across Bangladesh.',
    },
    name: 'Prottoya Printing & Packaging',
    nav: { services: 'Services', work: 'Work', process: 'Process', contact: 'Contact', quote: 'Get a quote' },
    toggles: { lang: 'বাংলা', langLabel: 'বাংলায় দেখুন', theme: 'Switch light or dark theme', menu: 'Menu' },
    hero: {
      eyebrow: 'Printing & Packaging · Babu Bazar, Dhaka',
      title: ['Packaging', 'that sells', 'before it’s opened.'],
      sub: 'Custom boxes, bags, trays and stickers printed with your brand, from just 500 pieces. Designed, printed and delivered across Bangladesh.',
      cta: 'Get a quote',
      whatsapp: 'WhatsApp us',
      scroll: 'Scroll',
    },
    marquee: ['Pizza boxes', 'Mishti boxes', 'Stickers', 'Cake boxes', 'Parcel bags', 'Product boxes', 'Paper cones', 'Cup jackets'],
    services: { kicker: 'What we make', title: 'Everything paper, printed your way.', more: 'Quote this' },
    work: { kicker: 'Recent work', title: 'Fresh off the press.', hint: 'Drag or scroll', all: 'See more on Facebook' },
    process: {
      kicker: 'How it works',
      title: 'From idea to doorstep in four steps.',
      steps: [
        { t: 'Share your idea', d: 'Send your size, quantity and logo on WhatsApp or through the form below.' },
        { t: 'Design & proof', d: 'We prepare the dieline and artwork, then send you a proof to approve.' },
        { t: 'Print & finish', d: 'Offset printing on 300 GSM board, with foil, windows and custom die-cuts.' },
        { t: 'Deliver', d: 'Delivered to your door in Dhaka and 10+ cities across Bangladesh.' },
      ],
    },
    stats: [
      { n: 12, suffix: 'K+', label: 'Facebook followers' },
      { n: 500, suffix: '', label: 'Pieces minimum order' },
      { n: 10, suffix: '+', label: 'Cities we deliver to' },
      { n: 100, suffix: '%', label: 'Customers recommend us' },
    ],
    visit: {
      kicker: 'Display center',
      title: 'Touch the samples before you order.',
      body: 'Visit our display center in Babu Bazar to see board, finishes and hundreds of box styles in person.',
      address: '18, Sayed Hasan Ali Lane, Babu Bazar, Dhaka 1100',
      hours: 'Open every day',
      map: 'Open in Google Maps',
    },
    contact: {
      kicker: 'Start your order',
      title: 'Tell us what you need.',
      body: 'Share a few details and we will reply on WhatsApp or call you back.',
      name: 'Your name',
      phone: 'Phone',
      product: 'What do you need?',
      other: 'Something else',
      qty: 'Quantity',
      details: 'Size, colours, anything else',
      send: 'Send on WhatsApp',
      sending: 'Sending…',
      sent: 'Thanks! WhatsApp should open with your message. We have your request by email too.',
      fallback: 'WhatsApp opened with your message. If it did not, call us at 01846-846416.',
      call: 'Call',
      email: 'Email',
    },
    footer: { tagline: 'Printing & packaging for brands that want to be picked up.', rights: 'All rights reserved.' },
  },
  bn: {
    meta: {
      title: 'প্রত্যয় প্রিন্টিং ও প্যাকেজিং | ঢাকায় কাস্টম বক্স, ব্যাগ ও স্টিকার',
      description: 'মাত্র ৫০০ পিস থেকে কাস্টম প্রিন্টেড খাবারের বক্স, মিষ্টির বক্স, প্রোডাক্ট প্যাকেজিং ও স্টিকার। বাবুবাজার, ঢাকায় ডিসপ্লে সেন্টার। সারা দেশে ডেলিভারি।',
    },
    name: 'প্রত্যয় প্রিন্টিং ও প্যাকেজিং',
    nav: { services: 'সেবা', work: 'কাজ', process: 'প্রক্রিয়া', contact: 'যোগাযোগ', quote: 'কোটেশন নিন' },
    toggles: { lang: 'English', langLabel: 'View in English', theme: 'লাইট বা ডার্ক থিম পরিবর্তন', menu: 'মেনু' },
    hero: {
      eyebrow: 'প্রিন্টিং ও প্যাকেজিং · বাবুবাজার, ঢাকা',
      title: ['খোলার আগেই', 'যে প্যাকেজিং', 'বিক্রি করে।'],
      sub: 'আপনার ব্র্যান্ডের নাম ও লোগোসহ কাস্টম বক্স, ব্যাগ, ট্রে ও স্টিকার, মাত্র ৫০০ পিস থেকে। ডিজাইন, প্রিন্ট ও ডেলিভারি সারা বাংলাদেশে।',
      cta: 'কোটেশন নিন',
      whatsapp: 'হোয়াটসঅ্যাপে লিখুন',
      scroll: 'স্ক্রল',
    },
    marquee: ['পিৎজা বক্স', 'মিষ্টির বক্স', 'স্টিকার', 'কেক বক্স', 'পার্সেল ব্যাগ', 'প্রোডাক্ট বক্স', 'পেপার কোন', 'কাপ জ্যাকেট'],
    services: { kicker: 'আমরা যা বানাই', title: 'কাগজের সবকিছু, আপনার মতো করে প্রিন্ট।', more: 'কোটেশন নিন' },
    work: { kicker: 'সাম্প্রতিক কাজ', title: 'সদ্য প্রেস থেকে।', hint: 'টানুন বা স্ক্রল করুন', all: 'ফেসবুকে আরও দেখুন' },
    process: {
      kicker: 'যেভাবে কাজ করি',
      title: 'আইডিয়া থেকে দরজা পর্যন্ত, চার ধাপে।',
      steps: [
        { t: 'আইডিয়া জানান', d: 'হোয়াটসঅ্যাপ বা নিচের ফর্মে সাইজ, পরিমাণ ও লোগো পাঠান।' },
        { t: 'ডিজাইন ও প্রুফ', d: 'আমরা ডাইলাইন ও ডিজাইন তৈরি করে অনুমোদনের জন্য প্রুফ পাঠাই।' },
        { t: 'প্রিন্ট ও ফিনিশিং', d: '৩০০ জিএসএম বোর্ডে অফসেট প্রিন্ট, ফয়েল, উইন্ডো ও কাস্টম ডাই-কাট।' },
        { t: 'ডেলিভারি', d: 'ঢাকাসহ দেশের ১০টিরও বেশি শহরে আপনার দরজায় পৌঁছে দিই।' },
      ],
    },
    stats: [
      { n: 12, suffix: ' হাজার+', label: 'ফেসবুক ফলোয়ার' },
      { n: 500, suffix: '', label: 'পিস ন্যূনতম অর্ডার' },
      { n: 10, suffix: '+', label: 'শহরে ডেলিভারি' },
      { n: 100, suffix: '%', label: 'গ্রাহক রিকমেন্ড করেন' },
    ],
    visit: {
      kicker: 'ডিসপ্লে সেন্টার',
      title: 'অর্ডারের আগে স্যাম্পল হাতে নিয়ে দেখুন।',
      body: 'বাবুবাজারে আমাদের ডিসপ্লে সেন্টারে এসে বোর্ড, ফিনিশিং আর শত শত বক্সের ডিজাইন সরাসরি দেখুন।',
      address: '১৮, সৈয়দ হাসান আলী লেন, বাবুবাজার, ঢাকা ১১০০',
      hours: 'প্রতিদিন খোলা',
      map: 'গুগল ম্যাপে দেখুন',
    },
    contact: {
      kicker: 'অর্ডার শুরু করুন',
      title: 'কী লাগবে, জানান।',
      body: 'কিছু তথ্য দিন, আমরা হোয়াটসঅ্যাপে উত্তর দেব বা কল করব।',
      name: 'আপনার নাম',
      phone: 'ফোন',
      product: 'কী প্রয়োজন?',
      other: 'অন্য কিছু',
      qty: 'পরিমাণ',
      details: 'সাইজ, রং বা অন্য কিছু',
      send: 'হোয়াটসঅ্যাপে পাঠান',
      sending: 'পাঠানো হচ্ছে…',
      sent: 'ধন্যবাদ! আপনার মেসেজসহ হোয়াটসঅ্যাপ খুলবে। ইমেইলেও আমরা আপনার অনুরোধ পেয়েছি।',
      fallback: 'আপনার মেসেজসহ হোয়াটসঅ্যাপ খোলা হয়েছে। না খুললে কল করুন ০১৮৪৬-৮৪৬৪১৬ নম্বরে।',
      call: 'কল',
      email: 'ইমেইল',
    },
    footer: { tagline: 'যে ব্র্যান্ড সবার হাতে পৌঁছাতে চায়, তার জন্য প্রিন্টিং ও প্যাকেজিং।', rights: 'সর্বস্বত্ব সংরক্ষিত।' },
  },
} as const;

export type Copy = (typeof copy)['en'];
