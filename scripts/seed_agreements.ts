
import { sql } from '@vercel/postgres';
import 'dotenv/config';

const agreements = [
    // 1945
    {
        name: "Charter of the United Nations",
        year: 1945,
        category: "Security",
        signatories: ["Global"],
        summary: "Foundational treaty of the United Nations, establishing the structure and mandate of the UN to maintain international peace and security.",
        full_text: "We the peoples of the United Nations determined to save succeeding generations from the scourge of war...",
    },
    // 1946
    {
        name: "International Convention for the Regulation of Whaling",
        year: 1946,
        category: "Environment",
        signatories: ["Global"],
        summary: "Agreement to provide for the proper conservation of whale stocks and thus make possible the orderly development of the whaling industry.",
        full_text: "Recognizing the interest of the nations of the world in safeguarding for future generations the great natural resources represented by the whale stocks...",
    },
    // 1947
    {
        name: "General Agreement on Tariffs and Trade (GATT)",
        year: 1947,
        category: "Trade",
        signatories: ["Global"],
        summary: "Legal agreement minimizing barriers to international trade by eliminating or reducing quotas, tariffs, and subsidies.",
        full_text: "Recognizing that their relations in the field of trade and economic endeavour should be conducted with a view to raising standards of living...",
    },
    // 1948
    {
        name: "Convention on the Prevention and Punishment of the Crime of Genocide",
        year: 1948,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Defines genocide in legal terms and advises all participating countries to prevent and punish actions of genocide.",
        full_text: "The Contracting Parties confirm that genocide, whether committed in time of peace or in time of war, is a crime under international law...",
    },
    // 1949 (Mandatory)
    {
        name: "North Atlantic Treaty (NATO)",
        year: 1949,
        category: "Security",
        signatories: ["USA", "UK", "Canada", "France", "Various European Nations"],
        summary: "Established the North Atlantic Treaty Organization (NATO), a system of collective defense.",
        full_text: "The Parties to this Treaty reaffirm their faith in the purposes and principles of the Charter of the United Nations...",
    },
    {
        name: "Geneva Conventions (I-IV)",
        year: 1949,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Comprises four treaties, and three additional protocols, that establish the standards of international law for humanitarian treatment in war.",
        full_text: "The High Contracting Parties undertake to respect and to ensure respect for the present Convention in all circumstances...",
    },
    // 1951
    {
        name: "Convention Relating to the Status of Refugees",
        year: 1951,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Defines who is a refugee, and sets out the rights of individuals who are granted asylum and the responsibilities of nations that grant asylum.",
        full_text: "Considering that the Charter of the United Nations and the Universal Declaration of Human Rights approved on 10 December 1948...",
    },
    // 1957 (Mandatory)
    {
        name: "Treaty of Rome (EEC)",
        year: 1957,
        category: "Trade",
        signatories: ["Belgium", "France", "Italy", "Luxembourg", "Netherlands", "West Germany"],
        summary: "Established the European Economic Community (EEC), aiming to bring about economic integration, including a common market.",
        full_text: "Determined to lay the foundations of an ever closer union among the peoples of Europe...",
    },
    // 1959
    {
        name: "Antarctic Treaty",
        year: 1959,
        category: "Security",
        signatories: ["Global"],
        summary: "Sets aside Antarctica as a scientific preserve, establishes freedom of scientific investigation, and bans military activity on the continent.",
        full_text: "Recognizing that it is in the interest of all mankind that Antarctica shall continue forever to be used exclusively for peaceful purposes...",
    },
    // 1961
    {
        name: "Vienna Convention on Diplomatic Relations",
        year: 1961,
        category: "Security",
        signatories: ["Global"],
        summary: "Defines a framework for diplomatic relations between independent countries.",
        full_text: "Recalling that peoples of all nations from ancient times have recognized the status of diplomatic agents...",
    },
    // 1963
    {
        name: "Partial Nuclear Test Ban Treaty",
        year: 1963,
        category: "Security",
        signatories: ["USA", "USSR", "UK"],
        summary: "Prohibits all test detonations of nuclear weapons except for those conducted underground.",
        full_text: "Proclaiming as their principal aim the speediest possible achievement of an agreement on general and complete disarmament...",
    },
    // 1966
    {
        name: "International Covenant on Civil and Political Rights (ICCPR)",
        year: 1966,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Commits its parties to respect the civil and political rights of individuals, including the right to life, freedom of religion, freedom of speech, freedom of assembly, electoral rights and rights to due process and a fair trial.",
        full_text: "Recognizing that, in accordance with the Universal Declaration of Human Rights, the ideal of free human beings enjoying civil and political freedom...",
    },
    // 1967
    {
        name: "Outer Space Treaty",
        year: 1967,
        category: "Security",
        signatories: ["Global"],
        summary: "Forms the basis of international space law, barring the placement of nuclear weapons in space.",
        full_text: "Inspired by the great prospects opening up before mankind as a result of man's entry into outer space...",
    },
    // 1968 (Mandatory)
    {
        name: "Treaty on the Non-Proliferation of Nuclear Weapons (NPT)",
        year: 1968,
        category: "Security",
        signatories: ["Global"],
        summary: "Objective is to prevent the spread of nuclear weapons and weapons technology, to promote cooperation in the peaceful uses of nuclear energy, and to further the goal of achieving nuclear disarmament.",
        full_text: "Considering the devastation that would be visited upon all mankind by a nuclear war and the consequent need to make every effort to avert the danger...",
    },
    // 1971
    {
        name: "Ramsar Convention",
        year: 1971,
        category: "Environment",
        signatories: ["Global"],
        summary: "Intergovernmental treaty that provides the framework for the conservation and wise use of wetlands and their resources.",
        full_text: "Recognizing the interdependence of Man and his environment...",
    },
    // 1972
    {
        name: "Biological Weapons Convention",
        year: 1972,
        category: "Security",
        signatories: ["Global"],
        summary: "First multilateral disarmament treaty banning the production of an entire category of weapons.",
        full_text: "Determined to act with a view to achieving effective progress towards general and complete disarmament...",
    },
    // 1973
    {
        name: "CITES",
        year: 1973,
        category: "Environment",
        signatories: ["Global"],
        summary: "Convention on International Trade in Endangered Species of Wild Fauna and Flora.",
        full_text: "Recognizing that wild fauna and flora in their many beautiful and varied forms are an irreplaceable part of the natural systems of the earth...",
    },
    // 1975 (Mandatory)
    {
        name: "Helsinki Accords",
        year: 1975,
        category: "Security",
        signatories: ["USA", "USSR", "European Nations"],
        summary: "An effort to reduce tension between the Soviet and Western blocs by securing their common acceptance of the post-World War II status quo in Europe.",
        full_text: "The participating States will respect each other's sovereign equality and individuality as well as all the rights inherent in and encompassed by its sovereignty...",
    },
    // 1979
    {
        name: "CEDAW",
        year: 1979,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Convention on the Elimination of All Forms of Discrimination Against Women.",
        full_text: "Noting that the Charter of the United Nations reaffirms faith in fundamental human rights, in the dignity and worth of the human person...",
    },
    // 1982
    {
        name: "UN Convention on the Law of the Sea (UNCLOS)",
        year: 1982,
        category: "Security",
        signatories: ["Global"],
        summary: "Defines the rights and responsibilities of nations with respect to their use of the world's oceans.",
        full_text: "Prompted by the desire to settle, in a spirit of mutual understanding and cooperation, all issues relating to the law of the sea...",
    },
    // 1984
    {
        name: "Convention against Torture",
        year: 1984,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Aims to prevent torture and other acts of cruel, inhuman, or degrading treatment or punishment around the world.",
        full_text: "Considering that, in accordance with the principles proclaimed in the Charter of the United Nations, recognition of the equal and inalienable rights...",
    },
    // 1985 (Mandatory)
    {
        name: "Schengen Agreement",
        year: 1985,
        category: "Trade",
        signatories: ["Belgium", "France", "West Germany", "Luxembourg", "Netherlands"],
        summary: "Led to the creation of Europe's Schengen Area, in which internal border checks have largely been abolished.",
        full_text: "The Governments of the Kingdom of Belgium, the Federal Republic of Germany, the French Republic, the Grand Duchy of Luxembourg and the Kingdom of the Netherlands...",
    },
    // 1985
    {
        name: "Vienna Convention for the Protection of the Ozone Layer",
        year: 1985,
        category: "Environment",
        signatories: ["Global"],
        summary: "Framework for international cooperation to protect the ozone layer.",
        full_text: "Aware of the potentially harmful impact on human health and the environment through modification of the ozone layer...",
    },
    // 1987
    {
        name: "Montreal Protocol",
        year: 1987,
        category: "Environment",
        signatories: ["Global"],
        summary: "Designed to protect the ozone layer by phasing out the production of numerous substances that are responsible for ozone depletion.",
        full_text: "Recognizing that world-wide emissions of certain substances can significantly deplete and otherwise modify the ozone layer...",
    },
    // 1989
    {
        name: "Convention on the Rights of the Child (CRC)",
        year: 1989,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Sets out the civil, political, economic, social, health and cultural rights of children.",
        full_text: "Recalling that, in the Universal Declaration of Human Rights, the United Nations has proclaimed that childhood is entitled to special care and assistance...",
    },
    // 1989
    {
        name: "Basel Convention",
        year: 1989,
        category: "Environment",
        signatories: ["Global"],
        summary: "Control of Transboundary Movements of Hazardous Wastes and Their Disposal.",
        full_text: "Aware of the risk of damage to human health and the environment caused by hazardous wastes and other wastes and the transboundary movement thereof...",
    },
    // 1990
    {
        name: "CFE Treaty",
        year: 1990,
        category: "Security",
        signatories: ["NATO", "Warsaw Pact"],
        summary: "Treaty on Conventional Armed Forces in Europe, establishing comprehensive limits on key categories of conventional military equipment.",
        full_text: "Committed to the objective of ensuring that the numbers of conventional armaments and equipment limited by the Treaty within the area of application...",
    },
    // 1991
    {
        name: "START I",
        year: 1991,
        category: "Security",
        signatories: ["USA", "USSR"],
        summary: "Strategic Arms Reduction Treaty, barring its signatories from deploying more than 6,000 nuclear warheads atop a total of 1,600 inter-continental ballistic missiles (ICBMs) and bombers.",
        full_text: "Conscious that nuclear war would have devastating consequences for all mankind...",
    },
    // 1992 (Mandatory)
    {
        name: "Maastricht Treaty",
        year: 1992,
        category: "Trade",
        signatories: ["EC Member States"],
        summary: "Created the European Union and led to the creation of the single European currency, the euro.",
        full_text: "Resolved to mark a new stage in the process of European integration undertaken with the establishment of the European Communities...",
    },
    // 1992
    {
        name: "Rio Convention (CBD)",
        year: 1992,
        category: "Environment",
        signatories: ["Global"],
        summary: "Convention on Biological Diversity, dedicated to promoting sustainable development.",
        full_text: "Conscious of the intrinsic value of biological diversity and of the ecological, genetic, social, economic, scientific, educational, cultural, recreational and aesthetic values...",
    },
    // 1993
    {
        name: "Chemical Weapons Convention",
        year: 1993,
        category: "Security",
        signatories: ["Global"],
        summary: "Outlaws the production, stockpiling, and use of chemical weapons and their precursors.",
        full_text: "Determined for the sake of all mankind, to exclude completely the possibility of the use of chemical weapons...",
    },
    // 1994 (Mandatory)
    {
        name: "TRIPS Agreement",
        year: 1994,
        category: "Trade",
        signatories: ["WTO Members"],
        summary: "Agreement on Trade-Related Aspects of Intellectual Property Rights, setting down minimum standards for many forms of intellectual property regulation.",
        full_text: "Desiring to reduce distortions and impediments to international trade, and taking into account the need to promote effective and adequate protection of intellectual property rights...",
    },
    // 1994
    {
        name: "NAFTA",
        year: 1994,
        category: "Trade",
        signatories: ["USA", "Canada", "Mexico"],
        summary: "North American Free Trade Agreement, creating a trilateral trade block in North America.",
        full_text: "Resolved to strengthen the special bonds of friendship and cooperation among their nations...",
    },
    // 1996
    {
        name: "CTBT",
        year: 1996,
        category: "Security",
        signatories: ["Global"],
        summary: "Comprehensive Nuclear-Test-Ban Treaty, bans all nuclear explosions, for both civilian and military purposes, in all environments.",
        full_text: "Recognizing that the cessation of all nuclear weapon test explosions and all other nuclear explosions...",
    },
    // 1997 (Mandatory)
    {
        name: "UN Watercourses Convention",
        year: 1997,
        category: "Environment",
        signatories: ["Global"],
        summary: "Convention on the Law of the Non-Navigational Uses of International Watercourses.",
        full_text: "The Parties to the present Convention, Conscious of the importance of international watercourses and the non-navigational uses thereof...",
    },
    // 1997
    {
        name: "Kyoto Protocol",
        year: 1997,
        category: "Environment",
        signatories: ["Global"],
        summary: "Extends the 1992 UNFCCC that commits state parties to reduce greenhouse gas emissions.",
        full_text: "The Parties to this Protocol, Being Parties to the United Nations Framework Convention on Climate Change...",
    },
    // 1997
    {
        name: "Ottawa Treaty",
        year: 1997,
        category: "Security",
        signatories: ["Global"],
        summary: "Convention on the Prohibition of the Use, Stockpiling, Production and Transfer of Anti-Personnel Mines and on their Destruction.",
        full_text: "Determined to put an end to the suffering and casualties caused by anti-personnel mines...",
    },
    // 1998 (Mandatory)
    {
        name: "Rome Statute of the ICC",
        year: 1998,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Treaty that established the International Criminal Court (ICC).",
        full_text: "Conscious that all peoples are united by common bonds, their cultures pieced together in a shared heritage...",
    },
    // 2000
    {
        name: "Cartagena Protocol on Biosafety",
        year: 2000,
        category: "Environment",
        signatories: ["Global"],
        summary: "International agreement on biosafety as a supplement to the Convention on Biological Diversity.",
        full_text: "The Parties to this Protocol, Being Parties to the Convention on Biological Diversity, hereby agree as follows...",
    },
    // 2001
    {
        name: "Stockholm Convention",
        year: 2001,
        category: "Environment",
        signatories: ["Global"],
        summary: "Treaty on Persistent Organic Pollutants.",
        full_text: "Recognizing that persistent organic pollutants possess toxic properties, resist degradation, bioaccumulate and are transported...",
    },
    // 2001
    {
        name: "Treaty of Nice",
        year: 2001,
        category: "Trade",
        signatories: ["EU Member States"],
        summary: "Amended the Maastricht Treaty (or the Treaty on European Union) and the Treaty of Rome (or the Treaty establishing the European Community).",
        full_text: "Desiring to complete the process started by the Treaty of Amsterdam of preparing the institutions of the European Union for enlargement...",
    },
    // 2003
    {
        name: "WHO Framework Convention on Tobacco Control",
        year: 2003,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "First treaty negotiated under the auspices of the World Health Organization.",
        full_text: "The Parties to this Convention, Determined to give priority to their right to protect public health...",
    },
    // 2005
    {
        name: "Convention on the Protection and Promotion of the Diversity of Cultural Expressions",
        year: 2005,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Binding international legal instrument that recognizes the sovereign right of States to formulate and implement their cultural policies.",
        full_text: "Affirming that cultural diversity is a defining characteristic of humanity...",
    },
    // 2006
    {
        name: "CRPD",
        year: 2006,
        category: "Human Rights",
        signatories: ["Global"],
        summary: "Convention on the Rights of Persons with Disabilities.",
        full_text: "The States Parties to the present Convention, Recalling the principles proclaimed in the Charter of the United Nations...",
    },
    // 2007
    {
        name: "Treaty of Lisbon",
        year: 2007,
        category: "Trade",
        signatories: ["EU Member States"],
        summary: "International agreement that amends the two treaties which form the constitutional basis of the European Union.",
        full_text: "Desiring to complete the process started by the Treaty of Amsterdam and by the Treaty of Nice...",
    },
    // 2008
    {
        name: "Convention on Cluster Munitions",
        year: 2008,
        category: "Security",
        signatories: ["Global"],
        summary: "Prohibits the use, transfer and stockpiling of cluster bombs.",
        full_text: "Deeply concerned that civilian populations and individual civilians continue to bear the brunt of armed conflict...",
    },
    // 2010
    {
        name: "New START",
        year: 2010,
        category: "Security",
        signatories: ["USA", "Russia"],
        summary: "Nuclear arms reduction treaty between the United States and the Russian Federation.",
        full_text: "The United States of America and the Russian Federation, hereinafter referred to as the Parties...",
    },
    // 2013
    {
        name: "Arms Trade Treaty",
        year: 2013,
        category: "Security",
        signatories: ["Global"],
        summary: "Multilateral treaty that regulates the international trade in conventional weapons.",
        full_text: "The States Parties to this Treaty, Guided by the purposes and principles of the Charter of the United Nations...",
    },
    // 2015 (Mandatory)
    {
        name: "Paris Agreement",
        year: 2015,
        category: "Environment",
        signatories: ["Global"],
        summary: "Agreement within the UNFCCC, on climate change mitigation, adaptation, and finance.",
        full_text: "In pursuit of the objective of the Convention, and being guided by its principles...",
    },
    // 2016 (Mandatory)
    {
        name: "EU-Turkey Statement",
        year: 2016,
        category: "Human Rights",
        signatories: ["EU", "Turkey"],
        summary: "Agreement relating to increasing engagement between the European Union and Turkey on the migration crisis.",
        full_text: "Members of the European Council met with Turkish counterpart to deepen Turkey-EU relations as well as to address the migration crisis...",
    },
    // 2017
    {
        name: "Treaty on the Prohibition of Nuclear Weapons (TPNW)",
        year: 2017,
        category: "Security",
        signatories: ["Global"],
        summary: "First legally binding international agreement to comprehensively prohibit nuclear weapons.",
        full_text: "The States Parties to this Treaty, Determined to achieve a world free of nuclear weapons...",
    },
    // 2018
    {
        name: "CPTPP",
        year: 2018,
        category: "Trade",
        signatories: ["Australia", "Brunei", "Canada", "Chile", "Japan", "Malaysia", "Mexico", "New Zealand", "Peru", "Singapore", "Vietnam"],
        summary: "Comprehensive and Progressive Agreement for Trans-Pacific Partnership.",
        full_text: "The Parties to this Agreement, resolving to: ESTABLISH a comprehensive regional agreement that promotes economic integration...",
    },
    // 2020 (Mandatory)
    {
        name: "Abraham Accords",
        year: 2020,
        category: "Security",
        signatories: ["Israel", "UAE", "Bahrain"],
        summary: "Joint statement between Israel, the United Arab Emirates, and the United States, reaching normalization.",
        full_text: "We, the undersigned, recognize the importance of maintaining and strengthening peace in the Middle East...",
    },
    // 2020
    {
        name: "USMCA",
        year: 2020,
        category: "Trade",
        signatories: ["USA", "Mexico", "Canada"],
        summary: "United States–Mexico–Canada Agreement, replacing NAFTA.",
        full_text: "The Government of the United States of America, the Government of the United Mexican States, and the Government of Canada, resolving to...",
    }
];

async function seed() {
    try {
        console.log('Starting seed...');

        // Create tables
        await sql`
      CREATE TABLE IF NOT EXISTS agreements (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        category VARCHAR(100),
        signatories TEXT[],
        summary TEXT,
        full_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS semantic_scores (
        id SERIAL PRIMARY KEY,
        agreement_id INT REFERENCES agreements(id),
        sovereignty_score INT,
        binding_score INT,
        human_centricity_score INT,
        economic_weight INT,
        analysis_notes TEXT
      );
    `;

        console.log('Tables created.');

        // Clear existing agreements to avoid duplicates on re-run (optional, but good for dev)
        await sql`TRUNCATE TABLE semantic_scores, agreements RESTART IDENTITY CASCADE;`;
        console.log('Cleared existing data.');

        for (const agreement of agreements) {
            await sql`
        INSERT INTO agreements (name, year, category, signatories, summary, full_text)
        VALUES (${agreement.name}, ${agreement.year}, ${agreement.category}, ${agreement.signatories}, ${agreement.summary}, ${agreement.full_text})
      `;
        }

        console.log(`Seeded ${agreements.length} agreements.`);
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seed();
