1. What's missing? Is this bar chart usable in its current form?  
  - The table title, labels, captions, scales are missing, as well as a way to sort the data
  - In this case, it's very difficult to interpret useful information from the bar chart because you don't know the information
    associated with the bars. 

2. What is the role of each of the three nested levels of `g` elements? (keep in mind you'll be adding a title to the chart)  
  - Each of the "g" elements represents a grouping of elements for the chart.  
  - The first "g" element is used for creating the margin of the document and then translating the origin based on the new margins.  
  - The second "g" groups the text elements together  
  - The third "g" groups the bars together for the bar chart  

3. Complete the implementation section below. Is there any consequence if you add the `text` elements before or after the `rect` elements? Why?
  - Yes, because the text elements depend on the existance of the rect elements.  If you dont have the rectangles, it wouldn't be able to determine the location of where to put the text elements.
