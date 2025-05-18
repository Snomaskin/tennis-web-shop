import { TextPageType } from "../components/TextCard/TextCard"


const aboutText: TextPageType = {
    outerText: {
        title: 'About',
        p1: `Welcome to our shop! We're passionate about delivering quality products 
            and exceptional service to our customers.`,
        p2: `Founded in 2025, we've made it our mission to provide a curated selection 
            of products that meet our high standards for quality and value.`,
        p3: `Our team is dedicated to ensuring your shopping experience is seamless 
            and enjoyable. We carefully select each item in our inventory and stand 
            behind every product we sell.`,
    },
    innerText: {
        title: 'Contact',
        p1: 'Email: contact@myshop.com',
        p2: 'Phone: (+46) 123-4567',
        p3: 'Hours: Monday - Friday, 9:00 - 17:00',
    }
};

const homeText: TextPageType = {
    outerText: {
        title: 'Welcome.',
        p1: `- Make tennis predictions with the prediction app `,
        p2: `- Try out the shop features`,
    },
    innerText: {
        title: 'News:',
        p1: `Backend with order- and user management is now live! Try placing an order and retrieving it.`,
        p2: 'Orders can be retrieved both as a member and guest user.'
    }
}
const texts = { 
    about: aboutText, 
    home: homeText,
};

export const useText = (page: keyof typeof texts) => texts[page];

