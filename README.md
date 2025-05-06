# Open House Booking System
For NUSH Open House, used since 2022.

By Lee Jia Jie, Tan Kai Xun Dave, Prannaya Gupta and Lim Teck Kong.  
Modifications by Liu Wenkai (2024), and Wong Yue Heng (2025).  

The deployed user interface is found at https://nush-open-house-tours.web.app/.  
The deployed admin interface is found at https://nush-open-house-tour.netlify.app/.

## Development Instructions

```
npm i
npm run serve
```

## Deploy Instructions
This system must NOT be deployed on AppVenture servers due to the likely high volume of users. Instead, the system has
been broken into its user-side (this repo) and admin-side (https://github.com/appventure-nush/nush-bookings-admin), and
is hosted on third-party platforms.

The user-side interface, located in this repo, is hosted on Firebase. The GitHub workflow in .github/workflows will
automatically build and deploy to Firebase on PR merge (the normal merge workflow doesn't work but I'm too lazy to fix
it), so always follow best practices of:  

1. Do all work in a seperate branch
2. Ensure the website works locally
3. Ask someone else to vet your code (this is an actual public-facing software!)
4. PR and merge

