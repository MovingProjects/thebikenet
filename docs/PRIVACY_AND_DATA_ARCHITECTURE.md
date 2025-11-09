# theBIKEnet – Privacy and Data Architecture Guidelines (by Moving Projects)

## 1. Introduction

**theBIKEnet** is a digital ecosystem developed by **Moving Projects** within the framework of the National Centre for Sustainable Mobility (MOST – Spoke 9: Urban Mobility).
It enables participatory cycling data collection and spatial analytics to support data-driven, inclusive, and sustainable mobility policies.

These guidelines outline how the platform collects, processes, and stores data in full compliance with the **General Data Protection Regulation (GDPR)** and the **FAIR principles** (Findable, Accessible, Interoperable, Reusable).
The system follows a *privacy-by-design* approach, integrating ethical research standards and transparent governance of participant-contributed data.

The platform leverages and extends the **PlanEasy WebGIS and Crowdsourcing Framework** for participatory data collection and spatial analytics. While based on PlanEasy’s infrastructure, all project-specific components—including questionnaires, backend logic, and dashboards—have been independently developed and are maintained by **Moving Projects**.

---

## 2. Data Collection and Purpose

### 2.1 What Data Are Collected

Participants voluntarily contribute through the mobile and web applications. Depending on the interaction, the following categories of data are collected:

* **Access Data:** optional email, authentication tokens, and consent logs.
* **Mobility Data:** GPS traces, timestamps, and trip-level metadata (distance, duration, route type).
* **Survey Data:** responses to behavioural, attitudinal, and pre/post-trip questionnaires.
* **Spatial Reports:** geo-referenced “land reports” on infrastructure conditions, safety issues, or positive experiences.
* **Technical Metadata:** device type, app version, browser, and timestamps, collected to ensure system stability and prevent duplication.

Participation is entirely **voluntary** and **non-commercial**. Data are collected exclusively for **scientific research** and to inform **urban mobility planning and policy evaluation**.

### 2.2 Why Data Are Collected

The collected information enables:

* Understanding cycling behaviour and route choice.
* Identifying infrastructure gaps and unsafe areas.
* Designing and validating indicators for cyclability, accessibility, and risk.
* Supporting municipalities and research partners in mobility planning.
* Promoting citizen engagement through transparent, data-informed feedback.

---

## 3. Privacy Architecture

### 3.1 Three-Layer Model

The platform implements a **three-layer architecture** ensuring strict separation between personal identifiers, pseudonymised research data, and public outputs.

| Layer                                  | Description                                                                  | Storage                                               | Access & Purpose                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| **1️⃣ Access Layer (Private)**         | Contains optional personal identifiers (e.g. email, UID, consent timestamp). | Firebase Auth / Firestore `user_links`                | Restricted to administrators for authentication and account deletion.         |
| **2️⃣ Research Layer (Pseudonymised)** | Stores GPS traces, survey data, and spatial reports without identifiers.     | Firestore collections: `traces`, `surveys`, `reports` | Used exclusively for research and internal validation. No public read access. |
| **3️⃣ Transparency Layer (Public)**    | Contains aggregated, anonymised results and indicators.                      | PostgreSQL / static JSON/GeoJSON files for WebGIS     | Publicly accessible for transparency, research, and open-data reuse.          |

This layered separation guarantees that no personally identifiable information (PII) is ever stored or processed together with behavioural or spatial data.

### 3.2 Data Protection Principles

* **Lawfulness and Transparency:** Users are informed before consenting to any data collection.
* **Data Minimisation:** Only data necessary for analysis are collected; participation in each questionnaire is optional.
* **Storage Limitation:** Raw data are retained only for the analysis period, then anonymised or aggregated.
* **Pseudonymisation:** Each contributor receives an internal UID (e.g., `user_XXXX`), pseudonymised using a one-way SHA-256 hash when derived from login information.
* **Anonymisation:** Public datasets remove coordinates, round timestamps, and spatially generalise sensitive information to prevent re-identification.
* **Security:** Encryption in transit and at rest; client write-access protected by Firebase App Check.
* **Accountability:** Privacy documentation and architecture diagrams are openly published on the project website and GitHub.

---

## 4. Data Architecture and Storage

TheBIKEnet architecture adopts a **modular backend and multi-database design** optimised for scalability, security, and transparency.

### 4.1 Core Databases

* **Firestore (Cloud):** real-time data collection from mobile and web clients; includes `traces`, `surveys`, and `reports` collections.
* **PostgreSQL (Self-hosted):** storage of anonymised and aggregated outputs for dashboard visualisation and analytics.
* **Authentication Layer:** Firebase Auth for optional user login and consent logging; isolated from mobility and survey data.

### 4.2 Data Processing Workflow

1. Data are collected from the mobile app (GPS, survey links, reports) and sent securely to Firestore.
2. The backend preprocesses and aggregates data, anonymising spatial information.
3. Aggregated datasets are exported to PostgreSQL for WebGIS rendering and analysis.
4. Public outputs (heatmaps, flow statistics, indices) are served as **static JSON/GeoJSON files** ensuring anonymity, immutability, and reproducibility.

### 4.3 Integration with External Data Sources

The architecture supports the integration of open datasets such as:

* **OpenStreetMap (OSM):** infrastructure, surfaces, slopes, and speed limits.
* **Municipal datasets:** cycling networks, traffic zones, and crash data.
* **Geospatial standards:** GeoJSON, CSV, and vector tiles for dashboard interoperability.

All integrations follow the FAIR data principles to ensure traceability and reusability.

---

## 5. FAIR Principles and Interoperability

**theBIKEnet** aligns with the FAIR (Findable, Accessible, Interoperable, Reusable) framework to guarantee data transparency and scientific reuse:

| FAIR Principle    | Implementation in theBIKEnet                                                             |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **Findable**      | Metadata and schemas are published on GitHub and indexed on the project website.         |
| **Accessible**    | Aggregated datasets and APIs are available through open-access endpoints.                |
| **Interoperable** | Uses open formats (GeoJSON, CSV, JSON-LD) and standard vocabularies (INSPIRE, OSM tags). |
| **Reusable**      | Anonymised data licensed under CC BY-NC-SA 4.0 for research and education.               |

By adhering to FAIR, Moving Projects ensures transparency and fosters collaboration among researchers, policymakers, and civic communities.

---

## 6. Data Retention and Sharing

* **Personal identifiers (Access Layer):** deleted upon user request or within 6 months after project closure.
* **Pseudonymised research data:** retained for up to 5 years after the end of data collection for scientific analysis under secure, access-controlled storage.
* **Aggregated public data:** remain permanently available as open datasets. These datasets are reviewed to ensure that no variable combination enables re-identification.
* **Data sharing:** limited to anonymised or aggregated outputs; no raw or identifiable data are shared externally.

Any data exchange or reuse complies with GDPR Article 89 (processing for scientific research purposes).

---

## 7. User Rights

Participants have the right to:

* Access their stored data.
* Request correction or deletion of information.
* Withdraw consent at any time.
* Receive explanations on how data are processed.
* Request access to anonymised datasets for verification under FAIR principles.

All requests can be sent to:
📧 **[info@movprojects.com](mailto:info@movprojects.com)**

---

## 8. Governance and Responsibility

**Data Controller:** Moving Projects
**Data Processor:** Moving Projects internal technical team
**Privacy Contact:** [info@movprojects.com](mailto:info@movprojects.com)
**Project Website:** [https://movprojects.com/thebikenet](https://movprojects.com/thebikenet)

---

## 9. Summary

TheBIKEnet implements a transparent, ethical, and FAIR-compliant framework for the collection and processing of cycling-related data.
By combining strict GDPR compliance with open-data principles, the system demonstrates how participatory research can empower citizens while preserving privacy and data integrity.
Moving Projects acts as both the technical developer and data controller, ensuring full accountability and continuity of governance throughout the lifecycle of the platform.

---

*Version 1.0 – Updated November 2025 (by Moving Projects)*
