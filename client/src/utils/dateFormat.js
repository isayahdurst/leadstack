const formatDate = (dateString) => {
    const unixTimestamp = parseInt(dateString);
    const date = new Date(unixTimestamp);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  export default formatDate;
  