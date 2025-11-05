import { Contact, TSearchUser } from '../types/type';

// Export utility functions
export const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (contacts: Contact[]) => {
  const headers = [
    'firstName',
    'lastName',
    'email',
    'phoneCountryCode',
    'phoneNumber',
    'birthdayDate',
    'birthdayMonth',
    'birthdayYear',
    'addressStreet',
    'addressCity',
    'addressCountry',
    'addressPostCode',
    'organizationName',
    'organizationPosition',
  ];

  const rows = contacts.map((contact) => {
    const monthMap: { [key: string]: number } = {
      JANUARY: 1,
      FEBRUARY: 2,
      MARCH: 3,
      APRIL: 4,
      MAY: 5,
      JUNE: 6,
      JULY: 7,
      AUGUST: 8,
      SEPTEMBER: 9,
      OCTOBER: 10,
      NOVEMBER: 11,
      DECEMBER: 12,
    };

    return [
      contact.firstName || '',
      contact.lastName || '',
      contact.email || '',
      contact.phone?.countryCode || '',
      contact.phone?.number || '',
      contact.birthday?.day || '',
      contact.birthday?.month ? monthMap[contact.birthday.month] || '' : '',
      contact.birthday?.year || '',
      contact.location?.streetAddress || '',
      contact.location?.city || '',
      contact.location?.country || '',
      contact.location?.postCode || '',
      contact.worksAt?.companyName || '',
      contact.worksAt?.jobTitle || '',
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  downloadFile(csvContent, 'contacts.csv', 'text/csv');
};

export const exportToVCard = (contacts: Contact[]) => {
  const vcards = contacts
    .map((contact) => {
      const vCardData: { [key: string]: string } = {
        VERSION: '3.0',
        FN: '',
        N: '',
        EMAIL: '',
        TEL: '',
        BDAY: '',
        ADR: '',
        ORG: '',
        TITLE: '',
      };

      // FN (Full Name)
      const fullName =
        `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
      vCardData.FN = fullName;

      // N (Name)
      vCardData.N = `${contact.lastName || ''};${contact.firstName || ''};;;`;

      // EMAIL
      vCardData.EMAIL = contact.email || '';

      // TEL (Phone)
      vCardData.TEL = contact.phone?.number || '';

      // BDAY (Birthday)
      if (contact.birthday) {
        const monthMap: { [key: string]: string } = {
          JANUARY: '01',
          FEBRUARY: '02',
          MARCH: '03',
          APRIL: '04',
          MAY: '05',
          JUNE: '06',
          JULY: '07',
          AUGUST: '08',
          SEPTEMBER: '09',
          OCTOBER: '10',
          NOVEMBER: '11',
          DECEMBER: '12',
        };
        const { year, month, day } = contact.birthday;
        const formattedMonth = monthMap[month] || '01';
        const formattedDay = String(day).padStart(2, '0');
        vCardData.BDAY = `${year}-${formattedMonth}-${formattedDay}`;
      }

      // ADR (Address)
      if (contact.location) {
        const { streetAddress, city, country, postCode } = contact.location;
        vCardData.ADR = `;;${streetAddress || ''};${city || ''};;${postCode || ''};${country || ''}`;
      }

      // ORG (Organization)
      vCardData.ORG = contact.worksAt?.companyName || '';

      // TITLE (Job Title)
      vCardData.TITLE = contact.worksAt?.jobTitle || '';

      // Build vCard string
      let vcard = 'BEGIN:VCARD\n';
      Object.entries(vCardData).forEach(([key, value]) => {
        if (value) {
          vcard += `${key}:${value}\n`;
        }
      });
      vcard += 'END:VCARD\n';

      return vcard;
    })
    .join('\n');

  downloadFile(vcards, 'contacts.vcf', 'text/vcard');
};

export const exportToJSON = (contacts: Contact[]) => {
  const jsonContent = JSON.stringify(contacts, null, 2);
  downloadFile(jsonContent, 'contacts.json', 'application/json');
};

export const DUMMY_USERS: TSearchUser[] = [
  {
    _id: '1',
    avatar: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
  },
  {
    _id: '3',
    avatar: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
  },
  {
    _id: '4',
    email: 'sarah.williams@example.com',
    firstName: 'Sarah',
    lastName: 'Williams',
  },
  {
    _id: '5',
    avatar: { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    email: 'david.brown@example.com',
    firstName: 'David',
    lastName: 'Brown',
  },
];

export const getAvatarUrl = (user: TSearchUser) => {
  if (user.avatar?.url) {
    return user.avatar.url;
  }
  return `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName}`;
};
