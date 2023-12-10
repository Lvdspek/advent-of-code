using (var sr = new StreamReader("day1/input.txt"))
{
    string? line = sr.ReadLine();
    while (!string.IsNullOrEmpty(line)) 
    {
        line = sr.ReadLine();
        var numbers = string.Concat( line.Where( Char.IsDigit ) );

        int number;
        if (numbers.Count() == 1) {
            number = (int) numbers[0]^2;
        }
        else if (numbers.Count() == 2) {
            number = (int)numbers[0] + (int)numbers[1];
        }
        else if (numbers.Count() > 2) {
            numberSum = numbers.Select(x => (int)x).Sum();
            Console.WriteLine(number);
    }
}
