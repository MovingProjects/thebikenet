<div align="left">
<br/>
  <table border="0" cellpadding="0" cellspacing="0" style="border:1px solid transparent;">
    <tr style="border:1px solid transparent;">
      <td style="border:1px solid transparent; vertical-align: middle; padding-right: 16px;">
        <img src="https://github.com/MovingProjects/thebikenet/blob/main/docs/assets/theBIKEnet_logo.png" width="80" alt="theBIKEnet logo">
      </td>
      <td style="border:1px solid transparent; vertical-align: middle;">
        <h1 style="margin: 0; padding: 0;">theBIKEnet</h1>
        <p><strong>Transferring Human Experience into BIKE Network Evaluation Technologies</strong></p>
      </td>
    </tr>
  </table>
</div>

---

**theBIKEnet** is a public research project that explores, visualizes, and analyses **urban cycling and micromobility behaviour**,  
integrating survey data, GPS traces, and spatial indicators into a unified environment  
for studying **safety**, **accessibility**, and **cycling culture** in cities.

---

## 🧭 Overview

**theBIKEnet** investigates how people **move, perceive, and experience cycling** in urban areas.  
It combines data from:

- 🚲 **GPS tracking apps** for cycling trips  
- 📋 **Web-based questionnaires** on perceptions and habits  
- 🗺️ **Spatial context data** (infrastructure, environment, risk factors)  

The system connects individual experience with **urban data and transport analysis tools**,  
helping researchers and decision-makers design safer and more inclusive mobility networks.

---

## 📊 Research Modules

| Module | Description |
|---------|--------------|
| **Profile** | Demographic profile and cycling ability. |
| **Context** | Built environment, infrastructure, and exposure conditions. |
| **Safety Behaviour** | Individual practices, attention, and protective behaviour. |
| **Safety Perception** | Perceived safety and comfort across trip scenarios. |
| **Accidents & Risk Factors** | Self-reported incidents and risk perception. |
| **Mobility Services** | Shared mobility and integration with public transport. |
| **Beliefs & Attitudes** | Cognitive and affective factors shaping cycling choices. |
| **Trip Diary (pre/post)** | Actual mobility experiences and changes over time. |

Each module is published and versioned in the  
[**thebikenet-questionnaires →**](https://movingprojects.github.io/thebikenet/questionnaires/)

---

## 💶 Funding Acknowledgement

Project coordinated by **Moving Projects Srl**,  
developed using the **PlanEasy WebGIS Framework**.  

Funded under the **National Recovery and Resilience Plan (PNRR)** –  
Mission 4 “Education and Research”, Component 2 “From Research to Enterprise”, Investment 1.4  
**National Centre CN4 – Sustainable Mobility**,  
Spoke 9 – *Urban Mobility Project DICEA24SPOKE9UNI*  
**CUP B83C22002900007**

---

## 🔐 Transparency and Data Protection

All data collected through *theBIKEnet* comply with **GDPR (Article 89)** and open-science principles.  
Information on pseudonymization, ethics, and transparency is available here:

- [Privacy Notice](https://movingprojects.github.io/thebikenet/docs/privacy.html)  
- [Simplified Privacy Notice](https://movingprojects.github.io/thebikenet/docs/privacy-simple.html)
- [Privacy and Data Architecture Guidelines](https://github.com/MovingProjects/thebikenet/blob/main/docs/PRIVACY_AND_DATA_ARCHITECTURE.md)  

## Data contract

theBIKEnet uses the generic PlanEasy response contract for every questionnaire. The framework defines the reusable contract; this repository defines the theBIKEnet instruments and their research meaning.

```json
{
  "schema": "planeasy.response",
  "schema_version": "2.0",
  "response_kind": "survey | spatial_contribution | trip",
  "entity": {}, "related_entities": [], "geometry": {}, "answers": {},
  "meta": {"project": {}, "flow": {}, "user": {}, "device": {}}
}
```

`answers` remains nested and readable. `entity` identifies the main research object; `related_entities` records meaningful relationships. `response_kind` is semantic and is distinct from the technical `db_set` destination.

Responses are stored at `surveyResponses/{questionnaireId}/responses/{responseId}`, `spatialReports/{questionnaireId}/responses/{responseId}`, or `trips/{questionnaireId}/responses/{responseId}`. Trip questionnaires use `flow: "pre_trip"` or `flow: "post_trip"`. Optional email input is converted to SHA-256 before persistence; raw email, credentials and tokens are never response data. v1 compatibility belongs to the framework loader/normalizer and is not represented by a `legacy` block in new data.

---

## 🌐 Official Links

- 🌍 **Website:** [https://movprojects.com/thebikenet](https://movprojects.com/thebikenet)  
- 💾 **GitHub Repository:** [https://github.com/MovingProjects/thebikenet](https://github.com/MovingProjects/thebikenet)

---

## 📬 Contact

For collaborations, data requests, or privacy inquiries:  
📧 **Dr. Lory Michelle Bresciani Miristice** — [lory.bresciani@movprojects.com](mailto:lory.bresciani@movprojects.com)

---

## 🔖 License

All materials in this repository are released under the  
**Creative Commons Attribution–NonCommercial 4.0 International (CC BY-NC 4.0)** license.

You are free to **share** and **adapt** the material  
under the following conditions:

- **Attribution (📘 BY):** Credit must be given to *Moving Projects*.  
- **NonCommercial (💼 NC):** The material may not be used for commercial purposes.  

Any other use requires **explicit written permission** from *Moving Projects*.

📄 Full license text: [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/)

© 2025 **Moving Projects Srl** ·
