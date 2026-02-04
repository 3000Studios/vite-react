
import { RESTAURANT_DATA } from "../constants";

export const getGatorResponse = async (userMessage: string, chatHistory: any[]) => {
  const msg = userMessage.toLowerCase();
  if (msg.includes('hours') || msg.includes('open')) {
    return "We’re open Sunday 12PM–5PM, Wednesday/Thursday 11AM–8PM, and Friday/Saturday 11AM–8PM. We’re closed Monday and Tuesday.";
  }
  if (msg.includes('address') || msg.includes('location') || msg.includes('where')) {
    return "You can find us at 140 Keith Dr, Canton, GA 30114.";
  }
  if (msg.includes('phone') || msg.includes('call')) {
    return "Give us a call at 678-899-7404, cher!";
  }
  if (msg.includes('email')) {
    return "Email us anytime at thecajunmenu@gmail.com.";
  }
  if (msg.includes('menu') || msg.includes('food')) {
    return "We’ve got Creamy Crab Dip, Bayou Low Boil, Alligator Bites, Crawfish Queso, and more. Tell me what flavors you’re craving!";
  }
  return `I'm Gator Bob, cher! Ask me about our menu, hours, or location.\n\nHere’s the quick info:\n${RESTAURANT_DATA}`;
};
