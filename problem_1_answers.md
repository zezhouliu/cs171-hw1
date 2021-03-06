1) What does the colspan="3" attribute of the "\<th\>" node do?  
  - The colspan="3" attribute of the "\<th\>" node makes the particular element span the size of 3 columns of the table. 
  

2) List all the styles (e.g. border width, text alignment, etc.) applied to the th element containing "Rank". For each, state whether they are set as an HTML attribute or a CSS style and describe them in a few words. Include only styles directly applied to the element, not styles inherited/cascading from parent elements or styles from the default user agent stylesheet. Exclude overwritten styles. For HTML attributes, state the CSS equivalent.  
  - align="center" is a HTML attribute that centers the text in the element.  The CSS equivalent is text-align: -webkit-center;
  - padding: 3px is a CSS style that adds a 3px-wide padding between the text and the table border.  
  - line-height: 1.22em is a CSS style that sets the size of each text line  

3) What differences do you notice between the DOM inspector and the HTML source? Why would you use the DOM inspector? Why is the HTML source useful?  
  - In the DOM inspector, I can edit the DOM and inject my own code to edit the page, whereas in the HTML source, I only see the static code related to the webpage.  
  - I also noticed that when I check the DOM inspector, the code may differ from the HTML source depending on additional JS or CSS media queries that update the page which could add or remove classes from particular elements.  
  - As a result, I would use the DOM inspector if I wanted to dynamically test my code because then I could automatically see the result on the webpage.  
  - The HTML source is useful because then I can check the original HTML source of the page.

  
