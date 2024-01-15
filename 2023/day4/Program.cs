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

        int scoreAddition = 0;

        for (int i = 0; i < matches.Length; i++)
        {
            scoreAddition = scoreAddition == 0
                ? 1
                : scoreAddition * 2;
        }

        totalScore += scoreAddition;

        line = sr.ReadLine();
    }

    Console.WriteLine($"Total score: {totalScore}");
}
