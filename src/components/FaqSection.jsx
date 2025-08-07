import { ChevronDown, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
// import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is WIFELIKE?",
    answer: "WIFELIKE is an Islamic matrimonial platform designed to help Muslim singles find compatible partners while adhering to Islamic principles and values. We facilitate meaningful connections through a guardian-supervised process."
  },
  {
    id: 2,
    question: "Who can join WIFELIKE?",
    answer: "WIFELIKE is open to practicing Muslim singles who are serious about marriage and committed to following Islamic guidelines. Both men and women aged 18 and above can join with proper guardian involvement."
  },
  {
    id: 3,
    question: "How does guardian (Wali) involvement work?",
    answer: "In accordance with Islamic tradition, all interactions are supervised by guardians (Wali). Your guardian will be involved in the matching process and must approve any potential connections before communication begins."
  },
  {
    id: 4,
    question: "How do I create a profile?",
    answer: "Creating a profile is simple: register with your basic information, provide guardian details, upload appropriate photos, complete your personal and religious preferences, and wait for profile verification."
  },
  {
    id: 5,
    question: "Why do I need guardian information?",
    answer: "Guardian information is required to maintain Islamic principles and ensure all interactions are conducted properly. Guardians play a crucial role in the Islamic marriage process and help ensure serious intentions."
  },
  {
    id: 6,
    question: "How long does profile approval take?",
    answer: "Profile approval typically takes 24-48 hours. Our team reviews all profiles to ensure they meet our community standards and Islamic guidelines. You'll be notified via email once approved."
  },
  {
    id: 7,
    question: "How do I contact someone I'm interested in?",
    answer: "All initial contact must go through guardians. When you're interested in someone, we facilitate the connection between guardians first, who then coordinate further communication according to Islamic principles."
  },
  {
    id: 8,
    question: "Can I talk directly to potential matches?",
    answer: "Direct communication is only permitted after both guardians approve and proper Islamic protocols are followed. All conversations should be conducted with the knowledge and presence of guardians."
  },
  {
    id: 9,
    question: "What if I don't have a guardian?",
    answer: "If you don't have a natural guardian (father/brother), the local Islamic community, mosque imam, or Islamic center can help provide guidance and supervision in accordance with Islamic principles."
  },
  {
    id: 10,
    question: "What behavior is not allowed?",
    answer: "We strictly prohibit inappropriate conversations, sharing personal contact information without guardian approval, requesting private meetings, and any behavior that contradicts Islamic values and principles."
  },
  {
    id: 11,
    question: "What happens if Islamic guidelines are violated?",
    answer: "Violations of Islamic guidelines result in immediate warnings, temporary suspension, or permanent account termination depending on the severity. We maintain a zero-tolerance policy for inappropriate behavior."
  },
  {
    id: 12,
    question: "How much does WIFELIKE cost?",
    answer: "We offer various membership plans starting from $29.99/month for basic features, with premium plans at $49.99/month including enhanced matching and priority support. Annual subscriptions receive significant discounts."
  },
  {
    id: 13,
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 30-day money-back guarantee for all new subscriptions. Refunds are processed within 5-7 business days. Certain conditions apply for partial refunds on annual plans."
  },
  {
    id: 14,
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secured with industry-standard encryption for your safety."
  },
  {
    id: 15,
    question: "How can I get help?",
    answer: "Our support team is available 24/7 through live chat, email (support@wifelike.com), or phone. We also have an extensive help center with guides and tutorials for common questions."
  },
  {
    id: 16,
    question: "Online Istishar Service",
    answer: "Our Online Istishar (consultation) service connects you with qualified Islamic counselors and scholars who can provide guidance on marriage-related questions, compatibility concerns, and religious matters."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#C31F1F] rounded-lg p-4 text-center shadow-lg mb-6">
          <div className="flex items-center justify-center mb-1">
            <HelpCircle className="w-6 h-6 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">FAQ</h1>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 py-3 text-left bg-[#C31F1F] hover:bg-red-700 text-white font-medium transition-colors duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset rounded-lg text-base"
                aria-expanded={openItems.has(item.id)}
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                    openItems.has(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
