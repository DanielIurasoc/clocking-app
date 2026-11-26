# Clocko
A learning project designed in Figma and implemented in React Native, Expo, and Firebase as cloud storage and authentication service.

It was later put to production use on a more simplified version and runs since 2024 with no issues.

Main features:
- Login and Register screens, working alongside Firebase Authentication for complete auth flow, with restore session on same device, etc;
- Home Screen with multiple custom input fields for details such as: QR code for location, date, start and end time, break duration
- List of personal entries with detailed view for each one
- a side drawer for easy navigation and options changing (like theme, logout etc)
- settings page which allows for personal details updates (like name, phone number, etc), app preferences, or password reset. 

Some screenshots of the app:
| Login Screen | Register Screen |
| :---: | :---: |
| <img width="531" height="1147" alt="image" src="https://github.com/user-attachments/assets/bdef41a7-2534-49fc-a4cd-6a1a1cdc3a93" /> | <img width="534" height="1145" alt="image" src="https://github.com/user-attachments/assets/90a93a99-e523-44ac-8b6a-bba1207322fd" /> |
| Home page with profile picture, fields for adding an entry | Profile Picture is a button for a side drawer, with navigation fields, option buttons and app information |
| <img width="538" height="1146" alt="image" src="https://github.com/user-attachments/assets/26f300d9-0d75-4aaf-b26b-be1541e51cd9" /> | Logic is each workplace has an unique QR code which is used alongside the device's location to ensure the entry was placed from the right location |
| Location field opens the camera for QR scanning with custom overlay | Camera is not available in emulator, but a success message is sent after QR code is read and validated in the database |
| <img width="529" height="1144" alt="image" src="https://github.com/user-attachments/assets/f36bb044-96be-41bb-bcc4-0b82a9cbc830" /> | <img width="518" height="1150" alt="image" src="https://github.com/user-attachments/assets/0031a81b-0f51-4ebf-8b42-94c7e52b820c" /> |
| Calendar picker | Time Picker |
| <img width="533" height="1150" alt="image" src="https://github.com/user-attachments/assets/140e0537-5473-4414-baeb-926df276e5ee" /> | <img width="535" height="1142" alt="image" src="https://github.com/user-attachments/assets/157bd909-9cfe-4a59-a2e7-8892f42182c9" /> |
| Account entries list | Entry details with placeholders |
| <img width="521" height="1144" alt="image" src="https://github.com/user-attachments/assets/51dc4f84-3ed6-4919-b905-23a80405e7a1" /> | <img width="529" height="1139" alt="image" src="https://github.com/user-attachments/assets/972f7a45-9d8e-4e12-bd37-78a1b3ca40a7" /> |
| Settings page, with editable fields | Preferences and password reset |

