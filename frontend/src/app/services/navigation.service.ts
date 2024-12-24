import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };

    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {
            name: 'Dashboard',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'link',
            icon: 'i-Bar-Chart',
            state: './dashboard/v1'
            // sub: [
            //     { icon: 'i-Clock-3', name: 'Version 1', state: '/dashboard/v1', type: 'link' },
            //     { icon: 'i-Clock-4', name: 'Version 2', state: '/dashboard/v2', type: 'link' },
            //     { icon: 'i-Over-Time', name: 'Version 3', state: '/dashboard/v3', type: 'link' },
            //     { icon: 'i-Clock', name: 'Version 4', state: '/dashboard/v4', type: 'link' },
            // ]
        },
        {
            name: 'User Management',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Add-User', name: 'Customer', state: '/customer/list', type: 'link' },
                { icon: 'i-Add-User', name: 'Chef', state: '/chef/list', type: 'link' },
                { icon: 'i-Add-User', name: 'Driver', state: '/driver/list', type: 'link' },
            ]
        }
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();


}
