export const handleNumericandDecimalInput = (event: any) => {
    const newValue = event.target.value.replace(/[^\d.]/g, '');
    const parts = newValue.split('.');
    if (parts.length > 1) {
        const lastPart = parts.pop();
        if (lastPart && lastPart.length > 2) {
            parts[parts.length - 1] = lastPart.slice(0, 2);
        }
    }
  }

export const handleNumericInput = (event: any) => {
  const newValue = event.target.value.replace(/[^0-9]/g, '');
  event.target.value = newValue;
};
export function formatIsoDate(isoString:string) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);
    // Get the year, month, and day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

export const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

export const renderYesNo = (value: boolean) => {
    return value ? 'Yes' : 'No';
};
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const  convertToHourTime=(dateTime: string) => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
export const  convertToHour=(dateTime: string) => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

export const convertDecimalHours=(decimalHours: number) =>{
    const totalSeconds = Math.floor(decimalHours * 3600);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }

  export const formatDateintoMonthDay = (dateString : string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  export const  capitalizeAndConvert=(text: string)=> {
    // Convert snake_case to space-separated words
    let words = text.split('_');

    // Capitalize the first letter of each word and convert the rest to lowercase
    words = words?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the words back together with a space
    return words.join(' ');
}

export function detectBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Edg") > -1) {
    return "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } else if (userAgent.indexOf("Opera") > -1) {
    return "Opera";
  } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
    return "Internet Explorer";
  }

  return "Unknown";
}