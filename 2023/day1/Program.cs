using System.Text.RegularExpressions;

using (var sr = new StreamReader("day1/testinput.txt"))
{
    int count = 0;
    string? line = sr.ReadLine();
    int numberSum = 0;
    string[] numberWords = { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};

    while (!string.IsNullOrEmpty(line)) 
    {
        count++;

        Console.WriteLine(line);
        int[] numberIndices = new int[9];
        for (int i = 0; i < numberWords.Length; i++) {
            numberIndices[i] = line.IndexOf(numberWords[i]);
        }

        int? min = null;
        int? max = null;
        if (numberIndices.Any(x => x > -1)) {
            min = Array.IndexOf(numberIndices, numberIndices.Where(x => x > -1).Min());
            max = Array.IndexOf(numberIndices, numberIndices.Where(x => x > -1).Max());
            Console.WriteLine($"Found min and max: {min+1}, {max+1}");
        } 

        if (min != null) {

            switch(min) 
            {
                case 0:
                    line = ReplaceFirst(line, "one", "1");
                    break;
                case 1:
                    line = ReplaceFirst(line, "two", "2");
                    break;
                case 2:
                    line = ReplaceFirst(line, "three", "3");
                    break;
                case 3:
                    line = ReplaceFirst(line, "four", "4");
                    break;
                case 4:
                    line = ReplaceFirst(line, "five", "5");
                    break;
                case 5:
                    line = ReplaceFirst(line, "six", "6");
                    break;
                case 6:
                    line = ReplaceFirst(line, "seven", "7");
                    break;
                case 7:
                    line = ReplaceFirst(line, "eight", "8");
                    break;
                case 8:
                    line = ReplaceFirst(line, "nine", "9");
                    break;
            }
        }
        // TODO: ReplaceLast

        if (max != null) {
            switch(max) 
            {
                case 0:
                    line = line.Replace("one", "1");
                    break;
                case 1:
                    line = line.Replace("two", "2");
                    break;
                case 2:
                    line = line.Replace("three", "3");
                    break;
                case 3:
                    line = line.Replace("four", "4");
                    break;
                case 4:
                    line = line.Replace("five", "5");
                    break;
                case 5:
                    line = line.Replace("six", "6");
                    break;
                case 6:
                    line = line.Replace("seven", "7");
                    break;
                case 7:
                    line = line.Replace("eight", "8");
                    break;
                case 8:
                    line = line.Replace("nine", "9");
                    break;
            }
        }

        Console.WriteLine(line);
        var numbers = string.Concat( line.Where( Char.IsDigit ) );
        Console.WriteLine(numbers);

        var numberCombination = int.Parse(string.Concat(numbers[0], numbers.Last()));
        Console.WriteLine(numberCombination);
        numberSum += numberCombination;

        line = sr.ReadLine();
        //if (count > 20) break;
    }
    Console.WriteLine(numberSum);

}

string ReplaceFirst(string text, string oldText, string newText) {
    var regex = new Regex(Regex.Escape(oldText));
    return regex.Replace(text, newText, 1);
}
