1. The `domain()` function is the data range upon which the scale is calculated. What does `d3.selectAll("tbody tr")[0].length-1` mean?  
  - The first part of the code: `d3.selectAll("tbody tr")` calls the d3-library function to select all the `tr` elements that are nested inside the `tbody`; specifically, this returns an array containing all the rows (tr) in the table's body (tbody).
  - When you add the "[0]" to get `d3.selectAll("tbody tr")[0]`, you get an array of the actual collection of HTML elements corresponding to the rows in the table's body.
  - The complete command: `d3.selectAll("tbody tr")[0].length-1` returns the index of the last element of the array.

2. Add the snippet in your code. Describe, in words, what the following function calls return: `color(0)`, `color(10)` and `color(150)`?
  - `color(0)`: "#ff4500", looks like normal orange
  - `color(10)`: "#f25e26", a bright orange, brighter than the previous
  - `color(150)`: "#42ffff", a cyan color

3. If the array passed to `domain()` was the minimum and maximum rate values, how would that change the scale? In what situations would this be appropriate?
  - If we changed the array's min and max values, this would change the scale to only contain values from max to min.
  - This means our scale will then reflect the values in our data, meaning the minimum will be reflected by the minimum range color, while the max will represent the maximum range color.
