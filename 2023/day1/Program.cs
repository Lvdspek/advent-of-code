using System.Text.RegularExpressions;

using (var sr = new StreamReader("day1/input.txt"))
{
    int count = 0;
    string? line = sr.ReadLine();
    int numberSum = 0;
    string[] numberWords = { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};

    while (!string.IsNullOrEmpty(line)) 
    {
        count++;

        Console.WriteLine(line);
        int[] numberIndicesMin = new int[9];
        int[] numberIndicesMax = new int[9];
        for (int i = 0; i < numberWords.Length; i++) {
            numberIndicesMin[i] = line.IndexOf(numberWords[i]);
            numberIndicesMax[i] = line.LastIndexOf(numberWords[i]);
        }

        int? min = null;
        int? max = null;
        if (numberIndicesMin.Any(x => x > -1)) {
            min = Array.IndexOf(numberIndicesMin, numberIndicesMin.Where(x => x > -1).Min());
            max = Array.IndexOf(numberIndicesMax, numberIndicesMax.Where(x => x > -1).Max());
            Console.WriteLine($"Found min and max: {min+1}, {max+1}");
        } 

        if (min != null && !line.Any(Char.IsDigit) || (min != null && line.Any(Char.IsDigit) &&
                    line.IndexOf(numberWords[min ?? 99]) < line.IndexOf(line.First(Char.IsDigit)))) {

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

        if (max != null && !line.Any(Char.IsDigit) || (max != null && line.Any(Char.IsDigit) &&
                    line.IndexOf(numberWords[max ?? 0]) > line.IndexOf(line.First(Char.IsDigit)))) {
            switch(max) 
            {
                case 0:
                    line = ReplaceLast(line, "one", "1");
                    break;
                case 1:
                    line = ReplaceLast(line, "two", "2");
                    break;
                case 2:
                    line = ReplaceLast(line, "three", "3");
                    break;
                case 3:
                    line = ReplaceLast(line, "four", "4");
                    break;
                case 4:
                    line = ReplaceLast(line, "five", "5");
                    break;
                case 5:
                    line = ReplaceLast(line, "six", "6");
                    break;
                case 6:
                    line = ReplaceLast(line, "seven", "7");
                    break;
                case 7:
                    line = ReplaceLast(line, "eight", "8");
                    break;
                case 8:
                    line = ReplaceLast(line, "nine", "9");
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
    }
    Console.WriteLine(numberSum);

}

string ReplaceFirst(string text, string oldText, string newText) {
    var regex = new Regex(Regex.Escape(oldText));
    return regex.Replace(text, newText, 1);
}

string ReplaceLast(string text, string oldText, string newText) {
    int place = text.LastIndexOf(oldText);

    if (place == -1)
        return text;

    return text.Remove(place, oldText.Length).Insert(place, newText);
}
