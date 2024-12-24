export interface IMenuItem {
    id?: any;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: any[]; // Dropdown items
    badges?: any[];
    active?: boolean;
    routeModule?:string;
}
export const Navbar:IMenuItem[] = [

    {
        id: 1,
        active: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Bar-Chart",
        name: "Dashboard",
        state: "/dashboard/v1",
        type: "link",
        routeModule:"dashboard",
    },

    {
        id: 2,
        active: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Add-User",
        name: "User Management",
        type: "dropDown",
        sub: [
            { icon: 'i-Business-Man', name: 'Public Users', state: '/users/list-users', type: 'link', active: false },
            { icon: 'i-Business-Man', name: 'Partner Agents', state: '/users/list-default-agent', type: 'link', active: false },
            { icon: 'i-Business-Man', name: 'Client Agents', state: '/users/list-client', type: 'link', active: false },
            { icon: 'i-Business-Man', name: 'Near By Agents', state: '/users/nearby-agents', type: 'link', active: false }
        ],
        routeModule:"users",

    },
    {
        id: 3,
        active: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Dropbox",
        name: "Admin",
        type: "dropDown",
        sub: [
            { icon: 'i-Add-User', name: 'Admin', state: '/admin/adminlist', type: 'link', active: false },
            { icon: 'i-Add-User', name: 'Sub Admin', state: '/admin/subadminlist', type: 'link', active: false },
        ],
        routeModule:"admin",

    },

    {
        id: 4,
        active: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Business-Man",
        name: "FSA",
        state: "/fsa/list",
        type: "link",
        routeModule:"fsa",


    },

    {
        id: 5,
        active: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Business-Man",
        name: "Advertisement",
        state: "advertisement/list",
        type: "link",
        routeModule:"advertisement",


    },

    {
        id: 6,
        active: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Business-Man",
        name: "Request",
        state: "request/list-request",
        type: "link",
        routeModule:"request",


    },
    {
        id: 7,
        active: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Business-Man",
        name: "Contact Us",
        state: "contact/contact-list",
        type: "link",
        routeModule:"contact",


    },

    {
        id: 8,
        active: false,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        icon: "i-Business-Man",
        name: "Footer Text",
        state: "footer/footer-text",
        type: "link",
        routeModule:"footer",

    },
  
]

