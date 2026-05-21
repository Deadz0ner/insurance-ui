export type Policy = {
  id: string;
  insurer: string;
  type: "Health" | "Motor" | "Life" | "Travel";
  product: string;
  sumInsured: string;
  premium: string;
  renewIn: string;
  status: "Active" | "Expiring";
  policyNo: string;
  startDate: string;
  endDate: string;
  members?: string[];
};

export const policies: Policy[] = [
  {
    id: "p1",
    insurer: "Niva Bupa",
    type: "Health",
    product: "ReAssure 2.0",
    sumInsured: "₹10 L",
    premium: "₹22,500",
    renewIn: "26 days",
    status: "Expiring",
    policyNo: "NB-44210-9921",
    startDate: "12 Jun 2025",
    endDate: "11 Jun 2026",
    members: ["Self", "Spouse", "Child"],
  },
  {
    id: "p2",
    insurer: "HDFC ERGO",
    type: "Motor",
    product: "Optima Secure Car",
    sumInsured: "₹6.4 L IDV",
    premium: "₹8,200",
    renewIn: "4 months",
    status: "Active",
    policyNo: "HE-MOT-58221",
    startDate: "02 Sep 2025",
    endDate: "01 Sep 2026",
  },
  {
    id: "p3",
    insurer: "Max Life",
    type: "Life",
    product: "Smart Secure Plus",
    sumInsured: "₹1.5 Cr",
    premium: "₹14,800",
    renewIn: "8 months",
    status: "Active",
    policyNo: "ML-TRM-2210",
    startDate: "20 Jan 2025",
    endDate: "20 Jan 2026",
  },
  {
    id: "p4",
    insurer: "ICICI Lombard",
    type: "Travel",
    product: "Bharat Yatra",
    sumInsured: "$50,000",
    premium: "₹1,240",
    renewIn: "Trip ends 02 Jun",
    status: "Active",
    policyNo: "IL-TRV-9981",
    startDate: "15 May 2026",
    endDate: "02 Jun 2026",
  },
];

export type Claim = {
  id: string;
  policy: string;
  type: string;
  amount: string;
  date: string;
  status: "Filed" | "Assessing" | "Approved" | "Settled";
  step: number;
};

export const claims: Claim[] = [
  {
    id: "c1",
    policy: "HDFC ERGO Motor",
    type: "Accident — Rear bumper",
    amount: "₹18,400",
    date: "Today, 14:22",
    status: "Assessing",
    step: 2,
  },
  {
    id: "c2",
    policy: "Niva Bupa Health",
    type: "Cashless — Apollo Hosp.",
    amount: "₹1,42,000",
    date: "12 Apr 2026",
    status: "Settled",
    step: 4,
  },
];

export type Perk = {
  id: string;
  title: string;
  brand: string;
  cost: number;
  category: "Dining" | "Travel" | "Movies" | "Wellness" | "Shopping";
  emoji: string;
};

export const perks: Perk[] = [
  { id: "k1", title: "2 Premium Tickets", brand: "PVR INOX", cost: 800, category: "Movies", emoji: "🎬" },
  { id: "k2", title: "Dinner for Two", brand: "Olive Bar", cost: 3000, category: "Dining", emoji: "🍽️" },
  { id: "k3", title: "1-Night Stay", brand: "Taj Group", cost: 12000, category: "Travel", emoji: "🏨" },
  { id: "k4", title: "Spa Voucher", brand: "Four Fountains", cost: 2200, category: "Wellness", emoji: "💆" },
  { id: "k5", title: "₹1000 Voucher", brand: "Amazon", cost: 1000, category: "Shopping", emoji: "🛍️" },
  { id: "k6", title: "Airport Lounge", brand: "DreamFolks", cost: 1500, category: "Travel", emoji: "✈️" },
];

export const walletBalance = 2850;
export const totalPremium = 46740;
