int totalScore = 0;

using (var sr = new StreamReader("input.txt"))
{
    string? line = sr.ReadLine();

    while (line != null)
    {

        string cardNumbers = line.Split(":")[1];
        string winningNumbersString = cardNumbers.Split("|")[0];
        string ownNumbersString = cardNumbers.Split("|")[1];

        int[] winningNumbers =
            winningNumbersString.Split(" ")
                .Where(x => int.TryParse(x, out _))
                .Select(x => int.Parse(x))
                .ToArray();


        int[] ownNumbers =
            ownNumbersString.Split(" ")
                .Where(x => int.TryParse(x, out _))
                .Select(x => int.Parse(x))
                .ToArray();

        int[] matches =
            winningNumbers
                .Intersect(ownNumbers)
                .ToArray();

        // Console.WriteLine(string.Join(",", winningNumbers));
        // Console.WriteLine(string.Join(",", ownNumbers));
        // Console.WriteLine(string.Join(",", matches));
        int scoreAddition = 0;
        for(int i = 0; i < matches.Length; i++) {
            if (scoreAddition == 0) { 
                scoreAddition = 1;
            }
            else {
                scoreAddition += scoreAddition;
            }
        }
        totalScore += scoreAddition;
        Console.WriteLine($"Score addition: {scoreAddition}");

        line = sr.ReadLine();      
    }

    Console.WriteLine($"Total score: {totalScore}");
}
