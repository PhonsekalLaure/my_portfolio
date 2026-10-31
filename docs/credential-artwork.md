# Credential artwork

Original badge images retrieved on 2026-10-31 from the `image.id` field of each credential's public Credly Open Badges class. The badge-class endpoints and public verification pages are recorded in `src/content/certifications.ts`. Files are stored under `public/assets/credentials/` and rendered through `next/image`; the page makes no runtime requests to Credly for artwork.

The artwork is preserved without cropping or recoloring. A white frame keeps transparent badges readable in both themes. Credential names, issuers, and categories are shown separately as accessible text.

| Local file                            | Original image                                                                                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `it-specialist-python.png`            | [Certiport Python badge](https://images.credly.com/images/3c4602d8-832e-4a24-b42d-00359ce746f7/ITS-Badges_Python_1200px.png)                                 |
| `it-specialist-databases.png`         | [Certiport Databases badge](https://images.credly.com/images/49a492cd-5f72-4c9d-aafa-06649e4853fb/MicrosoftTeams-image__5_.png)                              |
| `pmi-project-management-ready.png`    | [PMI Project Management Ready badge](https://images.credly.com/images/650208e5-851e-45d3-9ee9-cea899428427/blob)                                             |
| `ccst-networking.png`                 | [Cisco CCST Networking badge](https://images.credly.com/images/57d88bab-75be-4400-a2fd-dbfa8e2b056e/image.png)                                               |
| `devnet-associate.png`                | [Cisco DevNet Associate course badge](https://images.credly.com/images/35985f2b-38d6-4b6f-8e63-42b17d3b5c69/DEVASC_Learning_Badge.png)                       |
| `ccna-introduction-to-networks.png`   | [Cisco Introduction to Networks course badge](https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png)                         |
| `ccna-switching-routing-wireless.png` | [Cisco Switching, Routing, and Wireless Essentials course badge](https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png)     |
| `ccna-enterprise-networking.png`      | [Cisco Enterprise Networking, Security, and Automation course badge](https://images.credly.com/images/0a6d331e-8abf-4272-a949-33f754569a76/CCNAENSA__1_.png) |
