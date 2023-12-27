int maxRed = 12;
int maxGreen = 13;
int maxBlue = 14;

using (var sr = new StreamReader("input.txt"))
{
    string? line = sr.ReadLine();
    int validScore = 0;
    int gamePowerScore = 0;

    while (line != null)
    {

        int gameNumber = getGameNumber(line);
        // Console.WriteLine(gameNumber);
        var games = getGames(line);
        // Console.WriteLine(string.Join(";", games));
        bool areAllGamesValid = true;
        
        int minRed = 0;
        int minGreen = 0;
        int minBlue = 0;
        foreach (var game in games)
        {
            string inputGame = "," + game;
            // Console.WriteLine(inputGame);
            if (game.Contains("red")) {
                int currentRed = getColorValue("red", inputGame);
                if (currentRed > minRed)
                    minRed = currentRed;
                areAllGamesValid &= isGameValid("red", inputGame, maxRed);
            // Console.WriteLine("red: " + areAllGamesValid);
            }
            if (game.Contains("green")) {
                int currentGreen = getColorValue("green", inputGame);
                if (currentGreen > minGreen)
                    minGreen = currentGreen;
                areAllGamesValid &= isGameValid("green", inputGame, maxGreen);
            }
            // Console.WriteLine("green: " + areAllGamesValid);
            if (game.Contains("blue")) {
                int currentBlue = getColorValue("blue", inputGame);
                if (currentBlue > minBlue)
                    minBlue = currentBlue;
                areAllGamesValid &= isGameValid("blue", inputGame, maxBlue);
            }
            // Console.WriteLine("blue: " + areAllGamesValid);
        }

        if (areAllGamesValid)
            validScore += gameNumber;

        int gamePower = minRed * minGreen * minBlue;
        gamePowerScore += gamePower;

        line = sr.ReadLine();
    }

    Console.WriteLine($"Valid score: {validScore}");
    Console.WriteLine($"Power score: {gamePowerScore}");
}

int getGameNumber(string input)
{
    return int.Parse(input.Split("Game ")[1].Split(":")[0].ToString());
}

string[] getGames(string input)
{
    var gameInput = input.Split(":")[1];
    return gameInput.Split(";");
}

bool isGameValid(string color, string input, int maxValue)
{
    int colorValue = 99;
    if (input.Contains(color))
    {
        colorValue = getColorValue(color, input);

        return colorValue <= maxValue;
    }
    else
        return false;
}

int getColorValue(string color, string input) 
{
    return int.Parse(input.Split($" {color}")[0].Split(",").Last().ToString());
}